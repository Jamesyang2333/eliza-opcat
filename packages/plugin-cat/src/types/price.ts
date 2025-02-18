import { Content } from "@elizaos/core";

export interface PriceData {
    price: number;
}

export interface PriceApiResponse {
    data: {
        askPrice: number;
        bidPrice: number;
        latestTradePrice: number;
        timestamp: string;
        height: number;
    };
}
