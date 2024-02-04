import { getUserName } from "./username/username.mjs";
import process from "node:process";
import os from 'os';
import { list } from "./ls/ls.mjs";

let __username = "Unknown";
const pathToHomeDir = os.homedir();
const pathToCurrentUserWorkingDir = pathToHomeDir;
const invalidInputMessage = "Invalid input. Please try again to print your command and wait for result...";
const commands = {
  'ls': () => list(pathToCurrentUserWorkingDir)
}


const init = () => {
  __username = getUserName();
  console.log(`Welcome to the File Manager, ${__username}`);
  printDirInfo(pathToCurrentUserWorkingDir);
  console.log("Please print your command and wait for result...");
  process.on("SIGINT", () => {
    process.exit();
  });
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${__username}, goodbye!`);
  });
  process.stdin.on("data", (data) => {
    const exitCommand = ".exit";
    const command = data.toString().trim();
    if (command === exitCommand) {
      process.exit();
    } else if(!!commands[command]) {
      commands[command]();
      printDirInfo(pathToCurrentUserWorkingDir);
    } else {
      console.log(invalidInputMessage);
    }
  });
};

const printDirInfo = (dirInfo) => {
  console.log(`You are currently in ${dirInfo}`);
}

init();
