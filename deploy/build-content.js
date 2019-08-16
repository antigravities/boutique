const fs = require("fs");
const walk = require("./walk");

module.exports = async (meta) => {
  console.log("Building content...");
  await new Promise((resolve, reject) => {
    require("child_process").exec("npm run-script build", (e,stdout,_stderr) => e ? reject(e) : resolve(stdout));
  });

  fs.writeFileSync("build/index.html", fs.readFileSync("build/index.html").toString().replace("%SITE_NAME%", meta.name));

  console.log("Copying generated files...");
  fs.mkdirSync("build/generated");
  fs.mkdirSync("build/generated/list");
  fs.mkdirSync("build/generated/review");
  await walk("generated", (file) => {
    fs.writeFileSync("build/" + file, fs.readFileSync(file));
  });

  console.log("Generation complete.");
};