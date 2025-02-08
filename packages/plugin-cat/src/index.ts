import { Plugin } from "@elizaos/core";
import getBalance from "./actions/getBalance";
import getPrice from "./actions/getPrice";

export const catPlugin: Plugin = {
    name: "cat",
    description: "CAT Plugin for Eliza",
    actions: [getBalance, getPrice],
    evaluators: [],
    providers: [],
};

export default catPlugin;
