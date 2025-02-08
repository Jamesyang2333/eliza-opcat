import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const catEnvSchema = z.object({});

export type CatConfig = z.infer<typeof catEnvSchema>;

export async function validateCatConfig(
    runtime: IAgentRuntime
): Promise<CatConfig> {
    try {
        const config = {};

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
