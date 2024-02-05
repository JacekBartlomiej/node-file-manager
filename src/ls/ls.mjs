import { readdir } from "node:fs/promises";

const sortFiles = (a, b) => {
  if (a.type === "directory" && b.type === "file") {
    return -1;
  } else if (a.type === "file" && b.type === "directory") {
    return 1;
  } else {
    return 0;
  }
};

export const list = async (path) => {
  return new Promise(async (resolve) => {
    const files = await readdir(path, { withFileTypes: true });
    //TODO: check what it means: "type of directory content should be marked explicitly (e.g. as a corresponding column value)"
    if (files) {
      console.table(
        files
          .map((file) => ({
            Name: file.name,
            type: file.isDirectory() ? "directory" : "file",
          }))
          .sort((a, b) => sortFiles(a, b))
      );
      resolve(true);
    } else {
      resolve(false);
    }
  });
};
