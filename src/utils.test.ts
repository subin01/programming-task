import { expect, test } from "vitest";
import {
  IPMap,
  URLMap,
  extractIp,
  extractUrl,
  extractDate,
  prepareMaps,
  getTopIps,
  getTopUrls,
  getUniqueIpCount,
} from "./utils";

// @ts-ignore
import { log1, log2, ipMap1, urlMap1 } from "./__mocks__/data";

test("extracts IP from a line of Log", () => {
  expect(extractIp(log1[0])).toBe("177.71.128.21");
});

test("extracts URL from a line of Log", () => {
  expect(extractUrl(log1[0])).toBe("/intranet-analytics/");
});

test("extracts Date from a line of Log", () => {
  expect(extractDate(log1[0])).toBe("10/Jul/2018:22:21:28 +0200");
});

test("prepares ipMap properly", () => {
  const [ipMap, _] = prepareMaps(log2);
  const expected: IPMap = {
    "1.1.1.1": {
      ip: "1.1.1.1",
      earliestVisit: 1531254088000,
      latestVisit: 1847737288000,
    },
    "2.2.2.2": {
      ip: "2.2.2.2",
      earliestVisit: 1531254088000,
      latestVisit: 1531340488000,
    },
  };

  expect(ipMap).toStrictEqual(expected);
});

test("prepares urlMap properly", () => {
  const [_, urlMap] = prepareMaps(log2);
  const expected: URLMap = {
    "/": 1,
    "/intranet-analytics/": 4,
  };

  expect(urlMap).toStrictEqual(expected);
});

test("gets top URLs from urlMap", () => {
  expect(getUniqueIpCount(urlMap1)).toBe(6);
});

test("gets top IP from ipMap", () => {
  expect(getTopIps(ipMap1)).toStrictEqual([4, 2, 3]);
});

test("gets top URLs from urlMap", () => {
  expect(getTopUrls(urlMap1)).toStrictEqual(["e", "d", "c"]);
});
