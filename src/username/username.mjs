import { parseArgs as nodeParseArgs } from "node:util";

const getUserName = () => {
  const options = {
    username: {
      type: "string",
    },
  };
  const { tokens } = nodeParseArgs({ options, tokens: true });
  const username = tokens.find(
    (token) => token.kind === "option" && token.name === "username"
  );
  return username ? username.value : "Unknown";
};

export { getUserName };
