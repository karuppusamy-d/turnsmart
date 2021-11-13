/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const table = document.querySelector("table");
const body = table?.tBodies[0];
const rows = body?.rows;

const res = [];
for (let i = 0; i < rows.length; i++) {
  /* To Fetch Traits Data */
  res.push({
    name: rows[i].cells[0].innerText,
    value: rows[i].cells[1].innerText,
    description: rows[i].cells[2].innerText,
  });
  /* To Fetch Types Data */
  //   res.push({
  //     name: rows[i].cells[0].innerText,
  //     value: "action.devices.types." + rows[i].cells[0].innerText,
  //     description: rows[i].cells[1].innerText,
  //     Required: mapListItems(rows[i].cells[2].getElementsByTagName("li")),
  //   });
}

download(JSON.stringify(res), "result.json", "text/json");

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
