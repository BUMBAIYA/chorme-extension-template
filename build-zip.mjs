import archiver from "archiver";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

const zipFilename = `${manifest.name.replaceAll(" ", "-")}-${
  manifest.version
}.zip`;

const zipDir = path.resolve(__dirname, "zip");

if (fs.existsSync(zipDir) === false) {
  fs.mkdirSync(zipDir);
}

const fileStream = fs.createWriteStream(path.join(zipDir, zipFilename));

const achiverZip = archiver("zip", {
  zlib: {
    level: 9,
  },
});

fileStream.on("close", () => {
  console.log(`Zip was create with ${achiverZip.pointer()} bytes`);
});

achiverZip.on("warning", (err) => {
  if (err === "ENOENT") {
    console.error(err);
  } else {
    throw new err();
  }
});

achiverZip.on("error", (err) => {
  throw new err();
});

achiverZip.pipe(fileStream);

achiverZip.directory(path.resolve(__dirname, "build"), false);

achiverZip.finalize();
