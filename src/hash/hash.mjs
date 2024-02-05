import { createReadStream } from "node:fs";
const { createHash } = await import("node:crypto");
import path from "node:path";

export const hash = async (pathToCurrentUserWorkingDir, filePath) => {
    const fullfilePath = path.resolve(pathToCurrentUserWorkingDir, filePath);
    console.log('fullfilePath', fullfilePath);
    const hash = createHash("sha256");
    const input = createReadStream(fullfilePath);
    input.on("readable", () => {
      const data = input.read();
      if (data) hash.update(data);
      else {
        console.log(hash.digest("hex"));
      }
    });
};
