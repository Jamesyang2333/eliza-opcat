import axios from "axios";
import { ApiResponse, BalanceData } from "./types";

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
            const response = await client.get<ApiResponse>(
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
