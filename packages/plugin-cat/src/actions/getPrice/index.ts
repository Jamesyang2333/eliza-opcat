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
import { priceExamples } from "./examples";
import { createPriceService } from "./service";
import { getPriceTemplate } from "./template";
import { GetPriceContent } from "./types";
import { isGetPriceContent } from "./validation";

export default {
    name: "GET_PRICE",
    similes: [
        "CHECK_PRICE",
        "PRICE_CHECK",
        "GET_CRYPTO_PRICE",
        "CHECK_CRYPTO_PRICE",
        "GET_TOKEN_PRICE",
        "CHECK_TOKEN_PRICE",
    ],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        await validateCatConfig(runtime);
        return true;
    },
    description: "Get the current price of a CAT20 token",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting Cat20 GET_PRICE handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            // Compose and generate price check content
            const priceContext = composeContext({
                state,
                template: getPriceTemplate,
            });

            const content = (await generateObjectDeprecated({
                runtime,
                context: priceContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as GetPriceContent;

            // Validate content
            if (!isGetPriceContent(content)) {
                throw new Error("Invalid price check content");
            }

            // Get price from Unisat api
            const config = await validateCatConfig(runtime);

            const priceService = createPriceService();

            try {
                const priceData = await priceService.getPrice(content.tokenId);
                elizaLogger.success(
                    `Price retrieved successfully! Token ID: ${content.tokenId}, Price: ${priceData.price}`
                );

                if (callback) {
                    callback({
                        text: `The current price of token ${content.tokenId} is ${priceData.price} FB per token`,
                        content: {
                            symbol: content.tokenId,
                            currency: content.address,
                            ...priceData,
                        },
                    });
                }

                return true;
            } catch (error) {
                elizaLogger.error("Error in GET_PRICE handler:", error);
                if (callback) {
                    callback({
                        text: `Error fetching price: ${error.message}`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_PRICE handler:", error);
            if (callback) {
                callback({
                    text: `Error fetching price: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: priceExamples,
} as Action;
