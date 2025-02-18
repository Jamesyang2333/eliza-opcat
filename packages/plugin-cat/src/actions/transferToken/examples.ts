import { ActionExample } from "@elizaos/core";

export const transferExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Transfer 100 OPCAT token to address bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me transfer the token for you.",
                action: "TRANSFER_TOKEN",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Successfully transferred 100 OPCAT token to bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Transfer 100 token with id 7d61a8976e5d6adf034af48271585957d32b74fa73327c0a090840f0b43d20d4_0 to address bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me transfer the token for you.",
                action: "TRANSFER_TOKEN",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Successfully transferred 100 token with id 7d61a8976e5d6adf034af48271585957d32b74fa73327c0a090840f0b43d20d4_0 to bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru.",
            },
        },
    ],
];
