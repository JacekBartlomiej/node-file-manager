
import { readdir } from "node:fs/promises";

const sortFiles = (a, b) => {
    if(a.type === 'directory' && b.type === 'file') {
        return -1;
    } else if (a.type === 'file' && b.type === 'directory') {
        return 1;
    } else {
        return 0;
    }
}

export const list = async (path) => {
  const files = await readdir(path, { withFileTypes: true });
  console.table(
    files.map((file) => ({
      Name: file.name,
      type: file.isDirectory() ? "directory" : "file",
    })).sort((a, b) => sortFiles(a, b))
    )
};
