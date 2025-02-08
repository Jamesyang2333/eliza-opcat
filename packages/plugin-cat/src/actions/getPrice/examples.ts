import { ActionExample } from "@elizaos/core";

export const priceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the current price of OPCAT?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the price for you.",
                action: "GET_PRICE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current price of OPCAT is 1 FB per OPCAT",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the current price of the token with id 45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the price for you.",
                action: "GET_PRICE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current price is 1 FB per token",
            },
        },
    ],
];
