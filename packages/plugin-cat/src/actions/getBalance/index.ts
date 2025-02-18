import {
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";
import { validateCatConfig } from "../../environment";
import { balanceExamples } from "./examples";
import { createBalanceService } from "../../services/catToken";
import { getBalanceTemplate } from "./template";
import { GetBalanceContent } from "../../types/content";
import { isGetBalanceContent } from "./validation";

export default {
    name: "GET_BALANCE",
    similes: [
        "CHECK_BALANCE",
        "BALANCE_CHECK",
        "GET_CRYPTO_BALANCE",
        "CHECK_CRYPTO_BALANCE",
        "GET_TOKEN_BALANCE",
        "CHECK_TOKEN_BALANCE",
    ],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        await validateCatConfig(runtime);
        return true;
    },
    description: "Get the current balance of a CAT20 token",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting Cat20 GET_BALANCE handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            // Compose and generate balance check content
            const balanceContext = composeContext({
                state,
                template: getBalanceTemplate,
            });

            const content = (await generateObjectDeprecated({
                runtime,
                context: balanceContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as GetBalanceContent;

            // Validate content
            if (!isGetBalanceContent(content)) {
                throw new Error("Invalid balance check content");
            }

            // Get balance from CAT api
            const config = await validateCatConfig(runtime);

            const balanceService = createBalanceService();

            try {
                const balanceData = await balanceService.getBalance(
                    content.tokenId,
                    content.address
                );
                elizaLogger.success(
                    `Balance retrieved successfully! Token ID: ${content.tokenId}, Address: ${content.address}, Balance: ${balanceData.balance}`
                );

                if (callback) {
                    callback({
                        text: `The current balance of address ${content.address} for token ${content.tokenId} is ${balanceData.balance}`,
                        content: {
                            tokenId: content.tokenId,
                            address: content.address,
                            ...balanceData,
                        },
                    });
                }

                return true;
            } catch (error) {
                elizaLogger.error("Error in GET_BALANCE handler:", error);
                if (callback) {
                    callback({
                        text: `Error fetching balance: ${error.message}`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_BALANCE handler:", error);
            if (callback) {
                callback({
                    text: `Error fetching balance: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: balanceExamples,
} as Action;
