const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");

async function run(program, args) {
  const { stdout, stderr } = await exec(
    `${path.resolve(__dirname, "./")}/${program} ${args.toLowerCase()}`
  );
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

module.exports = run;

module.exports = run;
