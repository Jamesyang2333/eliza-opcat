import { Content } from "@elizaos/core";

export interface GetBalanceContent extends Content {
    tokenId: string;
    address: string;
}

export interface BalanceData {
    balance: number;
}

export interface BalanceApiResponse {
    data: {
        tokenId: string;
        confirmed: string;
        trackerBlockHeight: number;
    };
}

export interface UtxoData {
    data: {
        utxos: Array<{
            utxo: {
                txId: string;
                outputIndex: number;
                script: string;
                satoshis: string;
            };
            txoStateHashes: string[];
            state: {
                address: string;
                amount: string;
            };
        }>;
        trackerBlockHeight: number;
    };
}

export interface TokenInfoData {
    data: {
        minterAddr: string;
        tokenAddr: string;
        info: {
            max: string;
            name: string;
            limit: string;
            symbol: string;
            premine: string;
            decimals: number;
            minterMd5: string;
        };
        tokenId: string;
        revealTxid: string;
        revealHeight: number;
        genesisTxid: string;
        name: string;
        symbol: string;
        decimals: number;
        minterPubKey: string;
        tokenPubKey: string;
        firstMintHeight: number;
    };
}
