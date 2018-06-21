const { spawn } = require("child_process");
const path = require("path");

const run = (program, args) => {
  const _args = args ? args.split(" ").map(arg => arg.toLowerCase()) : [];
  console.log(`$ ${path.resolve(__dirname, "./")}/${program} `);

  const child = spawn(`${path.resolve(__dirname, "./")}/${program}`, _args);

  child.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  child.on("error", err => {
    throw err;
  });

  child.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
};

module.exports = run;
