import axios from "axios";
import {
    BalanceApiResponse,
    BalanceData,
    UtxoData,
    TokenInfoData,
} from "../types/catToken";

const BASE_URL = "https://tracker-fractal-mainnet.catprotocol.org/api";

export const createBalanceService = () => {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
        },
    });

    const getBalance = async (
        tokenId: string,
        address: string
    ): Promise<BalanceData> => {
        try {
            console.log(tokenId, address);
            const response = await client.get<BalanceApiResponse>(
                `/tokens/${tokenId}/addresses/${address}/balance`
            );

            console.log(
                "API Response:",
                JSON.stringify(response.data, null, 2)
            );

            const tokenData = response.data.data;
            if (!tokenData) {
                throw new Error(`No data found for address: ${address}`);
            }

            return {
                balance: parseInt(tokenData.confirmed) / 100,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.status?.error_message ||
                    error.message;
                console.error("API Error:", errorMessage);
                throw new Error(`API Error: ${errorMessage}`);
            }
            throw error;
        }
    };

    return { getBalance };
};

export const createUtxoService = () => {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
        },
    });

    const getUtxo = async (
        tokenId: string,
        address: string
    ): Promise<UtxoData> => {
        try {
            console.log(tokenId, address);
            const response = await client.get<UtxoData>(
                `/tokens/${tokenId}/addresses/${address}/utxos`
            );

            console.log(
                "API Response:",
                JSON.stringify(response.data, null, 2)
            );

            const utxoData = response.data;
            if (!utxoData) {
                throw new Error(`No data found for address: ${address}`);
            }

            return utxoData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.status?.error_message ||
                    error.message;
                console.error("API Error:", errorMessage);
                throw new Error(`API Error: ${errorMessage}`);
            }
            throw error;
        }
    };

    return { getUtxo };
};

export const createTokenInfoService = () => {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
        },
    });

    const getTokenInfo = async (tokenId: string): Promise<TokenInfoData> => {
        try {
            console.log(tokenId);
            const response = await client.get<TokenInfoData>(
                `/tokens/${tokenId}`
            );

            console.log(
                "API Response:",
                JSON.stringify(response.data, null, 2)
            );

            const tokenInfoData = response.data;
            if (!tokenInfoData) {
                throw new Error(`No data found for token: ${tokenId}`);
            }

            return tokenInfoData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.status?.error_message ||
                    error.message;
                console.error("API Error:", errorMessage);
                throw new Error(`API Error: ${errorMessage}`);
            }
            throw error;
        }
    };

    return { getTokenInfo };
};
