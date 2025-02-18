import { z } from "zod";
import { GetBalanceContent } from "../../types/content";

export const GetBalanceSchema = z.object({
    tokenId: z
        .string()
        .default(
            "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0"
        ),
    address: z.string(),
});

export function isGetBalanceContent(
    content: GetBalanceContent
): content is GetBalanceContent {
    return (
        typeof content.tokenId === "string" &&
        typeof content.address === "string"
    );
}
