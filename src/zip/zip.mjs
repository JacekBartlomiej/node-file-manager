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
  const sourcePath = path.resolve(pathToCurrentUserWorkingDir, pathToFile);
  const destinationPath = path.resolve(
    pathToCurrentUserWorkingDir,
    pathToDestination
  );
  const gzip = createBrotliCompress();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);
  await pipe(source, gzip, destination);
};

export const decompress = async (
  pathToCurrentUserWorkingDir,
  pathToFile,
  pathToDestination
) => {
  const sourcePath = path.resolve(pathToCurrentUserWorkingDir, pathToFile);
  const destinationPath = path.resolve(
    pathToCurrentUserWorkingDir,
    pathToDestination
  );
  const unzip = createBrotliDecompress();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);
  await pipe(source, unzip, destination);
};
