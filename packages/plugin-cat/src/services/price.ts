import axios from "axios";
import { PriceApiResponse, PriceData } from "../types/price";

const BASE_URL = "https://open-api-fractal.unisat.io/v1";

export const createPriceService = () => {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
        },
    });

    const getPrice = async (tokenId: string): Promise<PriceData> => {
        try {
            console.log(tokenId);
            const response = await client.get<PriceApiResponse>(
                `/cat20-dex/getTokenPrice`,
                {
                    params: {
                        tokenId: tokenId,
                    },
                }
            );

            console.log(
                "API Response:",
                JSON.stringify(response.data, null, 2)
            );

            const priceData = response.data.data;
            if (!priceData) {
                throw new Error(`No data found for token Id: ${tokenId}`);
            }

            return {
                price: priceData.latestTradePrice / 1000000,
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

    return { getPrice };
};
