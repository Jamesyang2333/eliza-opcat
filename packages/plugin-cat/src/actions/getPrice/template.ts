export const getPriceTemplate = `Respond with a JSON object containing tokenId. tokenId must default to "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0" if not specified.

IMPORTANT: Response must ALWAYS include the "tokenId" field.

Example response:
\`\`\`json
{
    "tokenId": "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0"
}
\`\`\`

{{recentMessages}}

Extract the tokenId from the most recent message. Always include tokenId (default "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0").
Respond with a JSON markdown block containing the tokenId.`;
