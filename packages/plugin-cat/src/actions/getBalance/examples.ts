import { ActionExample } from "@elizaos/core";

export const balanceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "How many OPCAT tokens does the address bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru have?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the balance for you.",
                action: "GET_BALANCE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current balance of OPCAT is 500",
            },
        },
    ],
];
