/* eslint-disable @typescript-eslint/explicit-function-return-type */

/*
  This script is used to fetch smart home device types data from the google developer website.
  Simply run this script and it will download the data as a json file.
  https://developers.google.com/assistant/smarthome/guides
*/

const table = document.querySelector("table");
const body = table?.tBodies[0];
const rows = body?.rows;

const res = [];
for (let i = 1; i < rows.length; i++) {
  /* To Fetch Traits Data */
  // res.push({
  //   name: rows[i].cells[0].innerText,
  //   value: rows[i].cells[1].innerText,
  //   description: rows[i].cells[2].innerText,
  // });

  /* To Fetch Types Data */
  let name = rows[i].cells[0].innerText
    .toLowerCase()
    .split("_")
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(" ");

  let lists = rows[i].cells[2].getElementsByTagName("ul");
  let para = rows[i].cells[2].getElementsByTagName("p");

  let required = para[0]?.innerText.includes("Required")
    ? mapListItems(lists[0].getElementsByTagName("li"))
    : para[2]?.innerText.includes("Required")
    ? mapListItems(lists[1].getElementsByTagName("li"))
    : [];
  let recommended = para[0]?.innerText.includes("Recommended")
    ? mapListItems(lists[0].getElementsByTagName("li"))
    : para[2]?.innerText.includes("Recommended")
    ? mapListItems(lists[1].getElementsByTagName("li"))
    : [];

  let supportedTraits = [
    "OnOff",
    "StartStop",
    "Brightness",
    "ColorSetting",
    "Dock",
    "FanSpeed",
    "Volume",
  ];
  let flag = false;
  required.forEach((val) => {
    if (!supportedTraits.includes(val)) {
      flag = true;
    }
  });
  if (flag) continue;

  res.push({
    name: name,
    value: "action.devices.types." + rows[i].cells[0].innerText,
    description: rows[i].cells[1].innerText,
    required: required,
    recommended: recommended,
  });
}

download(JSON.stringify(res, null, 2), "result.json", "text/json");

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function mapListItems(items) {
  const res = [];
  for (let i = 0; i < items.length; i++) {
    res.push(items[i].innerText);
  }
  return res;
}

export {};
