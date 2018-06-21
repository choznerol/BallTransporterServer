const { spawn } = require("child_process");

const run = (program, args) => {
  const _args = args ? args.split(" ").map(arg => arg.toLowerCase()) : [];
  console.log(`$ ${program} ${_args}`);

  const child = spawn(program, _args);

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
