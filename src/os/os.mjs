import * as nodeOs from "node:os";

export const os = (arg) => {
  //TODO: handle situation when wrong arg is provided
  switch (arg) {
    case "--EOL":
      console.log(JSON.stringify(nodeOs.EOL));
      break;
    case "--cpus":
      console.log(nodeOs.cpus());
      break;
    case "--homedir":
      console.log(nodeOs.homedir());
      break;
    case "--username":
      console.log(nodeOs.userInfo().username);
      break;
    case "--architecture":
      console.log(nodeOs.arch());
      break;
    default:
      break;
  }
};
