import { Plugin } from "@elizaos/core";
import getBalance from "./actions/getBalance";
import getPrice from "./actions/getPrice";
import transferToken from "./actions/transferToken";

export const catPlugin: Plugin = {
    name: "cat",
    description: "CAT Plugin for Eliza",
    actions: [getBalance, getPrice, transferToken],
    evaluators: [],
    providers: [],
};

export default catPlugin;
