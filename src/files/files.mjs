import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import path from "node:path";
import { writeFile } from "node:fs/promises";

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
