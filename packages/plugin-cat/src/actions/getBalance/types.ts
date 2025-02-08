import { Content } from "@elizaos/core";

export interface GetBalanceContent extends Content {
    tokenId: string;
    address: string;
}

export interface BalanceData {
    balance: number;
}

export interface ApiResponse {
    data: {
        tokenId: string;
        confirmed: string;
        trackerBlockHeight: number;
    };
}
