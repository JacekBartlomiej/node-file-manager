
import { readdir } from "node:fs/promises";

export const list = async (path) => {
  const files = await readdir(path, { withFileTypes: true });
  console.table(
    files.map((file) => ({
      Name: file.name,
      type: file.isDirectory() ? "directory" : "file",
    }))
  );
};
