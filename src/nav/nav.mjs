import { stat } from "node:fs/promises";
import path from "node:path";

export const cd = async (basePath, dir, updatePathToCurrentUserWorkingDir) => {
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

export const up = async (basePath, pathToHomeDir, updatePathToCurrentUserWorkingDir) => {
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
