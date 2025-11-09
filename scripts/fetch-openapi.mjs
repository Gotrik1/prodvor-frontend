import fs from "fs";
import https from "https";
import http from "http";
import Ajv from "ajv";

const OPENAPI_URL = process.env.OPENAPI_URL || "http://localhost:5000/openapi.json";
const TARGET = "./docs/OPENAPI_SPEC.json";
const TEMP = "./docs/OPENAPI_SPEC.json.tmp";

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

function validateOpenAPI(json) {
  try {
    const doc = JSON.parse(json);
    if (!doc.openapi && !doc.swagger) throw new Error("Not an OpenAPI doc");
    if (!doc.paths || typeof doc.paths !== "object") throw new Error("Missing paths");
    return doc;
  } catch (e) {
    throw new Error("Invalid JSON/OpenAPI: " + e.message);
  }
}

(async () => {
  console.log(`[openapi] downloading: ${OPENAPI_URL}`);
  try {
    const raw = await fetch(OPENAPI_URL);
    const doc = validateOpenAPI(raw);

    fs.writeFileSync(TEMP, JSON.stringify(doc, null, 2));
    fs.renameSync(TEMP, TARGET);
    console.log("[openapi] spec saved to", TARGET);
    process.exit(0);
  } catch(e) {
    console.error("[openapi] ERROR:", e.message);
    process.exit(1);
  }
})();
