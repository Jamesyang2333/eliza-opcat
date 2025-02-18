import { z } from "zod";
import { TransferTokenContent } from "../../types/content";

export const GetTransferSchema = z.object({
    tokenId: z
        .string()
        .default(
            "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0"
        ),
    amount: z.number().default(0),
    receiveAddress: z.string(),
});

export function isTransferTokenContent(
    content: TransferTokenContent
): content is TransferTokenContent {
    return (
        typeof content.tokenId === "string" &&
        typeof content.amount === "number" &&
        typeof content.receiveAddress === "string"
    );
}
