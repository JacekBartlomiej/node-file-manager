import { getUserName } from "./username/username.mjs";
import process from "node:process";

let __username = "Unknown";

const init = () => {
  __username = getUserName();
  console.log(`Welcome to the File Manager, ${__username}`);
  console.log("Please print your command and wait for result...");
  process.on("SIGINT", () => {
    process.exit();
  });
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${__username}, goodbye!`);
  });
  process.stdin.on("data", (data) => {
    const exitCommand = ".exit";
    const command = data.toString().trim();
    if (command === exitCommand) {
      process.exit();
    } else {
      console.log(`You printed: ${data}`);
    }
  });
};

init();
