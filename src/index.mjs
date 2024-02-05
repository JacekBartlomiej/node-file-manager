import { getUserName } from "./username/username.mjs";
import process from "node:process";
import * as nodeOs from "node:os";
import { os } from "./os/os.mjs";
import { list } from "./ls/ls.mjs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { cat, add, rn, cp, rm, mv } from "./files/files.mjs";
import { hash } from "./hash/hash.mjs";
import { compress, decompress } from "./zip/zip.mjs";

let __username = "Unknown";
const pathToHomeDir = nodeOs.homedir();
let pathToCurrentUserWorkingDir = pathToHomeDir;
const invalidInputMessage =
  "Invalid input. Please try again to print your command and wait for result...";
const operationFailedMessage =
  "Operation failed. Please try again to print your command and wait for result...";
const promptInfo = "Please print your command and wait for result...";
const commandsArguments = {
  ls: 0,
  cd: 1,
  up: 0,
  cat: 1,
  add: 1,
  rn: 2,
  cp: 2,
  mv: 2,
  rm: 1,
  os: 1,
  hash: 1,
  compress: 2,
  decompress: 2,
};
const commands = {
  ls: () => list(pathToCurrentUserWorkingDir),
  cd: (pathToDirectory) => cd(pathToCurrentUserWorkingDir, pathToDirectory),
  up: () => up(pathToCurrentUserWorkingDir),
  cat: (filePath) => cat(pathToCurrentUserWorkingDir, filePath),
  add: (fileName) => add(pathToCurrentUserWorkingDir, fileName),
  rn: (filePath, newFileName) =>
    rn(pathToCurrentUserWorkingDir, filePath, newFileName),
  cp: (filePath, newDirPath) =>
    cp(pathToCurrentUserWorkingDir, filePath, newDirPath),
  mv: (filePath, newDirPath) =>
    mv(pathToCurrentUserWorkingDir, filePath, newDirPath),
  rm: (filePath) => rm(pathToCurrentUserWorkingDir, filePath),
  os: (param) => os(param),
  hash: (filePath) => hash(pathToCurrentUserWorkingDir, filePath),
  compress: (filePath, destinationPath) =>
    compress(pathToCurrentUserWorkingDir, filePath, destinationPath),
  decompress: (filePath, destinationPath) =>
    decompress(pathToCurrentUserWorkingDir, filePath, destinationPath),
};

const init = () => {
  __username = getUserName();
  console.log(`Welcome to the File Manager, ${__username}`);
  printDirInfo(pathToCurrentUserWorkingDir);
  printPromptInfo();
  //TODO: check if process can be changed to Readline api
  process.on("uncaughtException", (err) => {
    printDirInfo(pathToCurrentUserWorkingDir);
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
        if (args.length !== commandsArguments[commandWord]) {
          printDirInfo(pathToCurrentUserWorkingDir);
          console.log(invalidInputMessage);
          return;
        }
        let result;
        if (args) {
          result = await commands[commandWord](...args);
        } else {
          result = await commands[commandWord]();
        }
        if (result) {
          printDirInfo(pathToCurrentUserWorkingDir);
          printPromptInfo();
        }
      } catch {
        printDirInfo(pathToCurrentUserWorkingDir);
        console.log(operationFailedMessage);
      }
    } else {
      printDirInfo(pathToCurrentUserWorkingDir);
      console.log(invalidInputMessage);
    }
  });
};

const printDirInfo = (dirInfo) => {
  console.log(`You are currently in ${dirInfo}`);
};

const printPromptInfo = () => {
  console.log(promptInfo);
};

const cd = async (basePath, dir) => {
  return new Promise(async (resolve) => {
    const dirPath = path.resolve(basePath, dir);
    const exists = await stat(dirPath);
    if (exists) {
      updatePathToCurrentUserWorkingDir(dirPath);
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const up = async (basePath) => {
  return new Promise(async (resolve) => {
    if (basePath === pathToHomeDir) {
      resolve(true);
      return;
    }
    const upPath = path.join(...basePath.split(path.sep).slice(0, -1));
    updatePathToCurrentUserWorkingDir(upPath);
    resolve(true);
  });
};

const updatePathToCurrentUserWorkingDir = (newPath) => {
  pathToCurrentUserWorkingDir = newPath;
};

init();
