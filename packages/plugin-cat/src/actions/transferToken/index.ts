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
import { transferExamples } from "./examples";
import {
    createBalanceService,
    createUtxoService,
    createTokenInfoService,
} from "../../services/catToken";
import { transferTokenTemplate } from "./template";
import { TransferTokenContent } from "../../types/content";
import { isTransferTokenContent } from "./validation";
import { createSigner } from "../../services/transfer"; // or UnisatSigner depending on your needs
import { singleSend } from "@cat-protocol/cat-sdk";
import {
    testChainProvider,
    testUtxoProvider,
} from "../../services/testProvider"; // You'll need to import these

export default {
    name: "TRANSFER_TOKEN",
    similes: [
        "SEND_TOKEN",
        "TOKEN_TRANSFER",
        "TOKEN_SEND",
        "TRANSFER_COIN",
        "COIN_TRANSFER",
        "SEND_COIN",
        "COIN_SEND",
    ],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        await validateCatConfig(runtime);
        return true;
    },
    description: "Transfer CAT20 token to given address",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting Cat20 TRANSFER_TOKEN handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            // Compose and generate balance check content
            const transferContext = composeContext({
                state,
                template: transferTokenTemplate,
            });

            const content = (await generateObjectDeprecated({
                runtime,
                context: transferContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as TransferTokenContent;

            // Validate content
            if (!isTransferTokenContent(content)) {
                throw new Error("Invalid balance check content");
            }

            // Get balance from CAT api
            const config = await validateCatConfig(runtime);

            const balanceService = createBalanceService();
            const utxoService = createUtxoService();
            const tokenInfoService = createTokenInfoService();
            const tokenInfoData = await tokenInfoService.getTokenInfo(
                content.tokenId
            );
            if (!tokenInfoData) {
                throw new Error("Token not found");
            }

            try {
                const balanceData = await balanceService.getBalance(
                    content.tokenId,
                    config.FRACTAL_ADDRESS
                );
                if (balanceData.balance < content.amount) {
                    throw new Error("Not enough balance");
                }

                const utxoData = await utxoService.getUtxo(
                    content.tokenId,
                    config.FRACTAL_ADDRESS
                );
                if (
                    parseInt(utxoData.data.utxos[0].state.amount) / 100 <
                    content.amount
                ) {
                    throw new Error(
                        "Single utxo balance not enough, merge token first"
                    );
                }
                // TODO: Implementa transfer given content.tokenId, content.amount, countent.receiveAddress
                console.log(
                    content.tokenId,
                    content.amount,
                    content.receiveAddress
                );
                try {
                    // Create signer instance
                    const signer = createSigner(config.FRACTAL_PRIVATE_KEY);

                    // Get the token UTXOs for the input
                    const inputTokenUtxos = utxoData.data.utxos[0];

                    const result = await singleSend(
                        signer,
                        testUtxoProvider,
                        testChainProvider,
                        tokenInfoData.data.minterAddr, // minterAddr
                        inputTokenUtxos,
                        [
                            {
                                address: content.receiveAddress,
                                amount: content.amount,
                            },
                        ],
                        await signer.getAddress(), // tokenChangeAddress (your own address for change)
                        5.0 // feeRate in sats/vbyte
                    );

                    console.log("Transfer successful!");
                    console.log("Send Transaction ID:", result.sendTxId);
                    console.log("Guard Transaction ID:", result.guardTxId);
                } catch (error) {
                    console.error("Transfer failed:", error);
                    throw error;
                }

                elizaLogger.success(
                    `Token transferred successfully! Token ID: ${content.tokenId}, ReceiveAddress: ${content.receiveAddress}, Amount: ${content.amount}`
                );

                if (callback) {
                    callback({
                        text: `Transfer ${content.amount} CAT20 token with tokenId ${content.tokenId} to addresss ${content.receiveAddress}`,
                        content: {
                            tokenId: content.tokenId,
                            amount: content.amount,
                            receiveAddress: content.receiveAddress,
                        },
                    });
                }

                return true;
            } catch (error) {
                elizaLogger.error("Error in TRANSFER_TOKEN handler:", error);
                if (callback) {
                    callback({
                        text: `Error transfering token: ${error.message}`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            elizaLogger.error("Error in TRANSFER_TOKE  handler:", error);
            if (callback) {
                callback({
                    text: `Error fetching balance: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: transferExamples,
} as Action;
