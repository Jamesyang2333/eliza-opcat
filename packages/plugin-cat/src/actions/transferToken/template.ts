export const transferTokenTemplate = `Respond with a JSON object containing tokenId, amount and receiveAddress. tokenId must default to "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0" if not specified.

IMPORTANT: Response must ALWAYS include "tokenId", "amount" and "receiveAddress" fields.

Example response:
\`\`\`json
{
    "tokenId": "45ee725c2c5993b3e4d308842d87e973bf1951f5f7a804b21e4dd964ecd12d6b_0",
    "amount": 100,
    "receiveAddress": "bc1pqst5tcx69p97sksp4fyvvk3mvfamkqt22kylaxyn34mt9c42xfhqpgszru"
}
\`\`\`

{{recentMessages}}

Extract the tokenId, amount and receiving address from the most recent message. Always include tokenId, amount and receiver address.
Respond with a JSON markdown block containing tokenId, amount, and receiveAddress.`;
