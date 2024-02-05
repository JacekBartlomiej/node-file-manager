import { getUserName } from "./username/username.mjs";
import process from "node:process";
import os from "os";
import { list } from "./ls/ls.mjs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { cat } from "./files/files.mjs";

let __username = "Unknown";
const pathToHomeDir = os.homedir();
let pathToCurrentUserWorkingDir = pathToHomeDir;
const invalidInputMessage =
  "Invalid input. Please try again to print your command and wait for result...";
const operationFailedMessage =
  "Operation failed. Please try again to print your command and wait for result...";
const commands = {
  ls: () => list(pathToCurrentUserWorkingDir),
  cd: (pathToDirectory) => cd(pathToCurrentUserWorkingDir, pathToDirectory),
  up: () => up(pathToCurrentUserWorkingDir),
  cat: (filePath) => cat(pathToCurrentUserWorkingDir, filePath)
};

const init = () => {
  __username = getUserName();
  console.log(`Welcome to the File Manager, ${__username}`);
  printDirInfo(pathToCurrentUserWorkingDir);
  console.log("Please print your command and wait for result...");
  //TODO: check if process can be changed to Readline api
  process.on("uncaughtException", () => {
    console.log(operationFailedMessage);
  });
  process.on("SIGINT", () => {
    process.exit();
  });
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${__username}, goodbye!`);
  });
  process.stdin.on("data", async (data) => {
    const exitCommand = ".exit";
    const command = data.toString().trim();
    if (command === exitCommand) {
      process.exit();
    } else if (!!commands[command.split(" ")[0]]) {
      try {
        const commandWord = command.split(" ")[0];
        const args = command.split(" ").slice(1);
        if (args) {
          await commands[commandWord](...args);
        } else {
          //TODO: add additional check if redundant args provided by user
          await commands[commandWord]();
        }
        printDirInfo(pathToCurrentUserWorkingDir);
      } catch {
        console.log(operationFailedMessage);
      }
    } else {
      console.log(invalidInputMessage);
    }
  });
};

const printDirInfo = (dirInfo) => {
  console.log(`You are currently in ${dirInfo}`);
};

const cd = async (basePath, dir) => {
  const dirPath = path.resolve(basePath, dir);
  await stat(dirPath);
  updatePathToCurrentUserWorkingDir(dirPath);
};

const up = async (basePath) => {
  if (basePath === pathToHomeDir) {
    return;
  }
  const upPath = path.join(...basePath.split(path.sep).slice(0, -1));
  updatePathToCurrentUserWorkingDir(upPath);
};

const updatePathToCurrentUserWorkingDir = (newPath) => {
  pathToCurrentUserWorkingDir = newPath;
};

init();
