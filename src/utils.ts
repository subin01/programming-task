import { DateTime } from "luxon";

/* ---------------------------- Extracting functions ---------------------------*/

export function extractIp(line: string) {
  //  https://regex101.com/r/7lNNG2/1
  const IPV4Regex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
  return line.match(IPV4Regex)?.[0] ?? "";
}

export function extractDate(line: string) {
  // Example: [10/Jul/2018:22:21:28 +0200]
  const date = line.match(/\[.+\]/)?.[0] ?? "";
  return date.replace("[", "").replace("]", "");
}

export function extractUrl(line: string) {
  if (line.includes("GET ")) {
    const str = line.split("GET ")[1];
    return str.substring(0, str.indexOf(" "));
  }
  return "";
}

/* ---------------------- Mapping & Sorting functions ----------------------- */

export function updateUrlMap(urlMap: URLMap, url: string) {
  if (urlMap[url]) {
    urlMap[url] = urlMap[url] + 1;
  } else {
    urlMap[url] = 1;
  }
}

export type URLMap = { [ip: string]: number };

export function sortUrlMapOnValue(urlMap: URLMap) {
  return Object.entries(urlMap)
    .sort((a, b) => b[1] - a[1])
    .map((el) => el[0]);
}

export type IPMapItem = {
  ip: string;
  earliestVisit: number;
  latestVisit: number;
};

export type IPMap = { [ip: string]: IPMapItem };

export function updateIPMap(ipMap: IPMap, ip: string, dateTime: number) {
  // Example: 10/Jul/2018:22:21:28 +0200

  if (!ipMap[ip]) {
    ipMap[ip] = {
      ip: ip,
      earliestVisit: dateTime,
      latestVisit: dateTime,
    };
  } else {
    ipMap[ip].earliestVisit = Math.min(ipMap[ip].earliestVisit, dateTime);
    ipMap[ip].latestVisit = Math.max(ipMap[ip].latestVisit, dateTime);
  }
}

export function sortIpMapOnTimeGap(a: IPMapItem, b: IPMapItem) {
  // Most Active = IP that has largest gap between earliest & latest visit.
  const aGap = a.latestVisit - a.earliestVisit;
  const bGap = b.latestVisit - b.earliestVisit;
  return bGap - aGap;
}

export function prepareMaps(lines: string[]): [IPMap, URLMap] {
  const urlMap: URLMap = {};
  const ipMap: IPMap = {};

  /* Prepare all Maps is one go */
  for (const line of lines) {
    const url = extractUrl(line);
    updateUrlMap(urlMap, url);

    const ip = extractIp(line);
    const date = extractDate(line);
    const dateInMillis = DateTime.fromFormat(
      date,
      "dd/MMM/yyyy:H:mm:ss ZZZ"
    ).toMillis();

    updateIPMap(ipMap, ip, dateInMillis);
  }

  return [ipMap, urlMap];
}

/* ------------------------- Reporting functions ------------------------ */

export function getUniqueIpCount(ipMap: IPMap) {
  return Object.keys(ipMap).length;
}

export function getTopUrls(urlMap: URLMap, count = 3) {
  return sortUrlMapOnValue(urlMap).slice(0, count);
}

export function getTopIps(ipMap: IPMap, count = 3) {
  const ipEntries: IPMapItem[] = Object.values(ipMap);
  ipEntries.sort(sortIpMapOnTimeGap);
  return ipEntries.slice(0, count).map((i) => i.ip);
}
