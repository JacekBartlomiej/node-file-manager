import * as nodeOs from "node:os";

export const os = (arg) => {
  return new Promise(async (resolve) => {
    switch (arg) {
      case "--EOL":
        console.log(JSON.stringify(nodeOs.EOL));
        resolve(true);
        break;
      case "--cpus":
        console.log(nodeOs.cpus());
        resolve(true);
        break;
      case "--homedir":
        console.log(nodeOs.homedir());
        resolve(true);
        break;
      case "--username":
        console.log(nodeOs.userInfo().username);
        resolve(true);
        break;
      case "--architecture":
        console.log(nodeOs.arch());
        resolve(true);
        break;
      default:
        throw new Error();
        break;
    }
  })
  //TODO: handle situation when wrong arg is provided
};
