import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const catEnvSchema = z.object({
    FRACTAL_ADDRESS: z.string().min(1, "FRACTAL ADDRESS is required"),
    FRACTAL_PRIVATE_KEY: z.string().min(1, "FRACTAL PRIVATE KEY is required"),
    CAT_NETWORK: z.string().min(1, "CAT NETWORK is required"),
});

export type CatConfig = z.infer<typeof catEnvSchema>;

export async function validateCatConfig(
    runtime: IAgentRuntime
): Promise<CatConfig> {
    try {
        const config = {
            FRACTAL_ADDRESS: runtime.getSetting("FRACTAL_ADDRESS"),
            FRACTAL_PRIVATE_KEY: runtime.getSetting("FRACTAL_PRIVATE_KEY"),
            CAT_NETWORK: runtime.getSetting("CAT_NETWORK"),
        };

        return catEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `CAT configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
