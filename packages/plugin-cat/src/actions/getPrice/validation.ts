import { z } from "zod";
import { GetPriceContent } from "./types";

export const GetPriceSchema = z.object({
    tokenId: z
        .string()
        .default(
            "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0"
        ),
});

export function isGetPriceContent(
    content: GetPriceContent
): content is GetPriceContent {
    return typeof content.tokenId === "string";
}
