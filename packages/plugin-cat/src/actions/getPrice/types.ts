import { Content } from "@elizaos/core";

export interface GetPriceContent extends Content {
    tokenId: string;
}

export interface PriceData {
    price: number;
}

export interface ApiResponse {
    data: {
        askPrice: number;
        bidPrice: number;
        latestTradePrice: number;
        timestamp: string;
        height: number;
    };
}
