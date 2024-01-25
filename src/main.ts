import { DateTime } from "luxon";
import log from "./programming-task-example-data.log?raw";
import "./style.css";

/* ---------------------------- Util functions ---------------------------*/

function extractIp(line: string) {
  return line.split(" - ")[0];
}

function extractDate(line: string) {
  // Example: [10/Jul/2018:22:21:28 +0200]
  const date = line.match(/\[.+\]/)?.[0] ?? "";
  return date.replace("[", "").replace("]", "");
}

function extractUrl(line: string) {
  if (line.includes("GET ")) {
    const str = line.split("GET ")[1];
    return str.substring(0, str.indexOf(" "));
  }
  return "";
}

function updateUrlMap(urlMap: URLMap, url: string) {
  if (urlMap[url]) {
    urlMap[url] = urlMap[url] + 1;
  } else {
    urlMap[url] = 1;
  }
}

type IPMapItem = { ip: string; earliestVisit: number; latestVisit: number };
type IPMap = { [ip: string]: IPMapItem };

function updateIPMap(ipMap: IPMap, ip: string, date: string) {
  // Example: 10/Jul/2018:22:21:28 +0200
  const dateInMillis = DateTime.fromFormat(
    date,
    "dd/MMM/yyyy:H:mm:ss ZZZ"
  ).toMillis();

  if (!ipMap[ip]) {
    ipMap[ip] = {
      ip: ip,
      earliestVisit: dateInMillis,
      latestVisit: dateInMillis,
    };
  } else {
    ipMap[ip].earliestVisit = Math.min(ipMap[ip].earliestVisit, dateInMillis);
    ipMap[ip].latestVisit = Math.max(ipMap[ip].latestVisit, dateInMillis);
  }
}

type URLMap = { [ip: string]: number };

function sortMapOnValue(urlMap: URLMap) {
  return Object.entries(urlMap)
    .sort((a, b) => b[1] - a[1])
    .map((el) => el[0]);
}

function sortbyTimeGap(a: IPMapItem, b: IPMapItem) {
  const aGap = a.latestVisit - a.earliestVisit;
  const bGap = b.latestVisit - b.earliestVisit;
  return bGap - aGap;
}

/* ---------------------------- Init ---------------------------*/

function init() {
  const lines = log.trim().split("\n");

  const urlMap: URLMap = {};
  const ipMap: IPMap = {};

  /* Prepare all Maps is one go */
  for (const line of lines) {
    const url = extractUrl(line);
    updateUrlMap(urlMap, url);

    const ip = extractIp(line);
    const date = extractDate(line);
    updateIPMap(ipMap, ip, date);
  }

  console.log("ipMap: ", ipMap);
  console.log("urlMap: ", urlMap);

  const ipEntries: IPMapItem[] = Object.values(ipMap);
  ipEntries.sort(sortbyTimeGap);

  const top3Ips = ipEntries.slice(0, 3).map((i) => i.ip);
  console.log("The top 3 most active IP addresses: ", top3Ips);

  const top3Urls = sortMapOnValue(urlMap).slice(0, 3);
  console.log("The top 3 most visited URLs: ", top3Urls);

  const allIps = Object.keys(ipMap);
  const uniqueIps = [...new Set(allIps)];
  console.log("The number of unique IP addresses: ", uniqueIps.length);

  // Display all in the page
  const root = document.querySelector("#app");
  if (root) {
    root.innerHTML = `
    <h2>The number of unique IP addresses:</h2> ${uniqueIps.length}
    <br/>
    <h2>The top 3 most visited URLs:</h2> ${top3Urls.join("<br/>")}
    <br/>
    <h2>The top 3 most active IP addresses:</h2> ${top3Ips.join("<br/>")}
    `;
  }
}

init();
