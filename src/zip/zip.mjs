import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import path from "node:path";

const pipe = promisify(pipeline);

export const compress = async (
  pathToCurrentUserWorkingDir,
  pathToFile,
  pathToDestination
) => {
  return new Promise(async (resolve) => {
    const sourcePath = path.resolve(pathToCurrentUserWorkingDir, pathToFile);
    const destinationPath = path.resolve(
      pathToCurrentUserWorkingDir,
      pathToDestination
    );
    const gzip = createBrotliCompress();
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath);
    pipe(source, gzip, destination).then(() => resolve(true));
  });
};

export const decompress = async (
  pathToCurrentUserWorkingDir,
  pathToFile,
  pathToDestination
) => {
  return new Promise(async (resolve) => {
    const sourcePath = path.resolve(pathToCurrentUserWorkingDir, pathToFile);
    const destinationPath = path.resolve(
      pathToCurrentUserWorkingDir,
      pathToDestination
    );
    const unzip = createBrotliDecompress();
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath);
    pipe(source, unzip, destination).then(() => resolve(true));
  });
};
