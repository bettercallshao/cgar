const fs = require("fs");
const yaml = require("js-yaml");

var config = {};

try {
  config = yaml.safeLoad(
    fs.readFileSync(process.env.CONFIG_PATH || "./secret/config.yaml", "utf8")
  );
} catch (e) {
  console.log(e);
}

module.exports = config;
