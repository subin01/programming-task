import log from "./logs/programming-task-example-data.log?raw";
import "./style.css";
import { prepareMaps, getTopIps, getTopUrls, getUniqueIpCount } from "./utils";

/* ---------------------------- Init ---------------------------*/

function init() {
  const lines = log.trim().split("\n");
  const [ipMap, urlMap] = prepareMaps(lines);

  // Processed data in Map structure
  console.log("ipMap: ", ipMap);
  console.log("urlMap: ", urlMap);

  // Logs report on console
  console.log("The number of unique IP addresses: ", getUniqueIpCount(ipMap));
  console.log("The top 3 most visited URLs: ", getTopUrls(urlMap));
  console.log("The top 3 most active IP addresses: ", getTopIps(ipMap));

  // and on a page
  const root = document.querySelector("#app");
  if (root) {
    root.innerHTML = `
    <h2>The number of unique IP addresses:</h2> ${getUniqueIpCount(ipMap)}
    <br/>
    <h2>The top 3 most visited URLs:</h2> ${getTopUrls(urlMap).join("<br/>")}
    <br/>
    <h2>The top 3 most active IP addresses:</h2> ${getTopIps(ipMap).join(
      "<br/>"
    )}
    `;
  }
}

init();
