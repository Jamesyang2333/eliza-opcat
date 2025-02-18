import { Content } from "@elizaos/core";

export interface GetBalanceContent extends Content {
    tokenId: string;
    address: string;
}

export interface GetPriceContent extends Content {
    tokenId: string;
}

export interface TransferTokenContent extends Content {
    tokenId: string;
    amount: number;
    receiveAddress: string;
}
