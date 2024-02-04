import { getUserName } from "./username/username.mjs";

let __username = "Unknown";

const init = () => {
  __username = getUserName();
  console.log(`Welcome to the File Manager, ${__username}`);
};

init();
