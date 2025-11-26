var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  normalize: () => normalize,
  normalizePath: () => normalizePath,
  normalizeUrl: () => normalizeUrl
});
module.exports = __toCommonJS(index_exports);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
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
    output = import_fs.default.readFileSync(import_path.default.resolve(pth), { encoding });
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
    import_fs.default.writeFileSync(import_path.default.resolve(process.cwd(), save), output, { encoding: "utf-8" });
  }
  return output;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  normalize,
  normalizePath,
  normalizeUrl
});
