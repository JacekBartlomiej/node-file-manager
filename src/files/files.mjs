import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import path from "node:path";
import { writeFile, rename } from "node:fs/promises";

export const cat = async (pathToCurrentUserWorkingDir, filePath) => {
  const resolvedPath = path.resolve(pathToCurrentUserWorkingDir, filePath);
  const stream = await createReadStream(resolvedPath);
  //TODO: cursor should be new line
  //TODO: prompt and where you are info should be after text that was printed
  stream.pipe(stdout);
};

export const add = async (pathToCurrentUserWorkingDir, fileName) => {
    const resolvedPath = path.resolve(pathToCurrentUserWorkingDir, fileName);
    await writeFile(resolvedPath, "");
};

export const rn = async (pathToCurrentUserWorkingDir, filePath, newFileName) => {
    const oldFilePath = path.resolve(pathToCurrentUserWorkingDir, filePath);
    const basePath = path.join(...oldFilePath.split(path.sep).slice(0, -1));
    const newFilePath = path.resolve(basePath, newFileName);
    await rename(oldFilePath, newFilePath);
};
