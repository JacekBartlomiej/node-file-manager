import { createReadStream, createWriteStream } from "node:fs";
import process from "node:process";
import path from "node:path";
import { writeFile, rename, rm as nodeRm } from "node:fs/promises";

export const cat = async (pathToCurrentUserWorkingDir, filePath) => {
  return new Promise(async (resolve) => {
    const resolvedPath = path.resolve(pathToCurrentUserWorkingDir, filePath);
    const stream = await createReadStream(resolvedPath);
    if (stream) {
      stream.pipe(process.stdout);
      stream.on("close", () => {
        console.log("");
        resolve(true);
      });
    } else {
      resolve(false);
    }
  });
};

export const add = async (pathToCurrentUserWorkingDir, fileName) => {
  return new Promise(async (resolve) => {
    const resolvedPath = path.resolve(pathToCurrentUserWorkingDir, fileName);
    writeFile(resolvedPath, "").then(() => resolve(true));
  });
};

export const rn = async (
  pathToCurrentUserWorkingDir,
  filePath,
  newFileName
) => {
  return new Promise(async (resolve) => {
    const oldFilePath = path.resolve(pathToCurrentUserWorkingDir, filePath);
    const basePath = path.join(...oldFilePath.split(path.sep).slice(0, -1));
    const newFilePath = path.resolve(basePath, newFileName);
    rename(oldFilePath, newFilePath).then(() => resolve(true));
  });
};

export const cp = async (pathToCurrentUserWorkingDir, filePath, newDirPath) => {
  return new Promise(async (resolve) => {
    const fullfilePath = path.resolve(pathToCurrentUserWorkingDir, filePath);
    const fileName = fullfilePath.split(path.sep).pop();
    const basePath = path.join(...fullfilePath.split(path.sep).slice(0, -1));
    const newFilePath = path.resolve(basePath, newDirPath, fileName);
    const stream = await createReadStream(fullfilePath);
    stream.pipe(createWriteStream(newFilePath));
    stream.on("close", () => {
      resolve(true);
    });
  });
};

export const rm = async (pathToCurrentUserWorkingDir, filePath) => {
  return new Promise(async (resolve) => {
    const fullfilePath = path.resolve(pathToCurrentUserWorkingDir, filePath);
    nodeRm(fullfilePath).then(() => resolve(true));
  });
};

export const mv = async (pathToCurrentUserWorkingDir, filePath, newDirPath) => {
  return new Promise(async (resolve) => {
    cp(pathToCurrentUserWorkingDir, filePath, newDirPath)
      .then(() => rm(pathToCurrentUserWorkingDir, filePath))
      .then(() => resolve(true));
  });
};
