import { getUserName } from "./username/username.mjs";
import process from "node:process";
import * as nodeOs from "node:os";
import { cd, up } from "./nav/nav.mjs";
import { os } from "./os/os.mjs";
import { list } from "./ls/ls.mjs";
import { cat, add, rn, cp, rm, mv } from "./files/files.mjs";
import { hash } from "./hash/hash.mjs";
import { compress, decompress } from "./zip/zip.mjs";

let __username = "Unknown";
const pathToHomeDir = nodeOs.homedir();
let pathToCurrentUserWorkingDir = pathToHomeDir;
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
  cd: (pathToDirectory) =>
    cd(
      pathToCurrentUserWorkingDir,
      pathToDirectory,
      updatePathToCurrentUserWorkingDir
    ),
  up: () =>
    up(
      pathToCurrentUserWorkingDir,
      pathToHomeDir,
      updatePathToCurrentUserWorkingDir
    ),
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
  printPromptInfo();
  //TODO: check if process can be changed to Readline api
  process.on("uncaughtException", (err) => {
    printOperationFailedInfo();
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
          printInvalidInputInfo();
          return;
        }
        let result;
        if (args) {
          result = await commands[commandWord](...args);
        } else {
          result = await commands[commandWord]();
        }
        if (result) {
          printPromptInfo();
        }
      } catch {
        printOperationFailedInfo();
      }
    } else {
      printInvalidInputInfo();
    }
  });
};

const printDirInfo = () => {
  console.log(`You are currently in ${pathToCurrentUserWorkingDir}`);
};

const printPromptInfo = () => {
  printDirInfo();
  const promptInfo = "Please print your command and wait for result...";
  console.log(promptInfo);
};

const printOperationFailedInfo = () => {
  printDirInfo();
  const operationFailedMessage =
    "Operation failed. Please try again to print your command and wait for result...";
  console.log(operationFailedMessage);
};

const printInvalidInputInfo = () => {
  printDirInfo();
  const invalidInputMessage =
    "Invalid input. Please try again to print your command and wait for result...";
  console.log(invalidInputMessage);
};

const updatePathToCurrentUserWorkingDir = (newPath) => {
  pathToCurrentUserWorkingDir = newPath;
};

init();
