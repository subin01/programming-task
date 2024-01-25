export const log1 = [
  `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`,
];

export const log2 = [
  `1.1.1.1 - - [10/Jul/2018:22:21:28 +0200] "GET / HTTP"`,
  `1.1.1.1 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP"`,
  `2.2.2.2 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP"`,
  `2.2.2.2 - - [11/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP"`,
  `1.1.1.1 - - [20/Jul/2028:22:21:28 +0200] "GET /intranet-analytics/ HTTP"`,
];

export const ipMap1 = {
  1: { ip: 1, earliestVisit: 1, latestVisit: 10 },
  2: { ip: 2, earliestVisit: 1, latestVisit: 50 },
  3: { ip: 3, earliestVisit: 1, latestVisit: 25 },
  4: { ip: 4, earliestVisit: 1, latestVisit: 100 },
  5: { ip: 5, earliestVisit: 1, latestVisit: 1 },
  6: { ip: 6, earliestVisit: 200, latestVisit: 200 },
};

export const urlMap1 = {
  a: 10,
  b: 20,
  c: 30,
  d: 40,
  e: 100,
  f: 10,
};
