import fs from "fs";
import https from "https";
import http from "http";
import Ajv from "ajv";

const OPENAPI_URL = process.env.OPENAPI_URL || "https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/openapi.json";
const TARGET = "./openapi.json";           // локальный файл спеки
const TEMP = "./openapi.json.tmp";

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const request = lib.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
    request.on('error', (err) => {
        console.error('Fetch error:', err.message);
        reject(err);
    });
    // For HTTPS requests to a self-signed certificate, you might need this.
    // In our case, the URL is likely trusted, but it's good to be aware.
    if (url.startsWith("https")) {
        // This is a workaround for potential self-signed certificate issues in dev environments
        // In a real production setup, you would have a valid certificate.
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        request.agentOptions = {
            rejectUnauthorized: false
        };
    }
  });
}

function validateOpenAPI(json) {
  try {
    const doc = JSON.parse(json);
    // лёгкая проверка (без огромной схемы): ключевые поля
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

    // атомарная запись
    fs.writeFileSync(TEMP, JSON.stringify(doc, null, 2));
    fs.renameSync(TEMP, TARGET);
    console.log("[openapi] spec saved to", TARGET);
    process.exit(0);
  } catch (e) {
      console.error("[openapi] ERROR:", e.message);
      // хотим жёстко падать, чтобы не получить битый SDK
      process.exit(1);
  }
})();
