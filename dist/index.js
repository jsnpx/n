// src/index.js
import fs from "fs";
import path from "path";
var normalizeUrl = async (nurl, encoding = "utf-8") => {
  let output;
  try {
    const response = await fetch(nurl, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    output = Buffer.from(arrayBuffer).toString(encoding);
  } catch (error) {
    console.log(error);
  }
  return output;
};
var normalizePath = async (pth, encoding = "utf-8") => {
  let output;
  try {
    output = fs.readFileSync(path.resolve(pth), { encoding });
  } catch (error) {
    console.log(error);
  }
  return output;
};
var normalize = async (url, opt = {}) => {
  let output;
  const { baseUrl, encoding, save } = opt;
  if (baseUrl && url.indexOf("/") === 0) {
    url = baseUrl + url;
  }
  if (url.indexOf("http") === 0) {
    output = await normalizeUrl(url, encoding);
  } else if (url.indexOf("@") === 0) {
    const cmp = url.substring(1).split("/");
    typ = cmp[2];
    cmp.splice(2, 0, "main");
    output = await normalizeUrl(`https://raw.githubusercontent.com/` + cmp.join("/"), encoding);
  } else if (Buffer.from(url, "base64").toString("base64") === url) {
    output = Buffer.from(url, "base64").toString("ascii");
  } else {
    output = await normalizePath(url, encoding);
  }
  if (save) {
    fs.writeFileSync(path.resolve(process.cwd(), save), output, { encoding: "utf-8" });
  }
  return output;
};
export {
  normalize,
  normalizePath,
  normalizeUrl
};
