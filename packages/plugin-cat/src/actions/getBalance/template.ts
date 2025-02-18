export const getBalanceTemplate = `Respond with a JSON object containing BOTH tokenId and address. tokenId default to "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0" if not specified.

IMPORTANT: Response must ALWAYS include both "tokenId" and "address" fields.

Example response:
\`\`\`json
{
    "tokenId": "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0",
    "address": "bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru"
}
\`\`\`

{{recentMessages}}

Extract the tokenId and address from the most recent message. Always include both tokenId and address.
Respond with a JSON markdown block containing both tokenId and address.`;
