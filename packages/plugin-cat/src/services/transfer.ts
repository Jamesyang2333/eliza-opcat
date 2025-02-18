import { DefaultSigner, AddressType } from "@cat-protocol/cat-sdk";
import * as ecc from "@bitcoinerlab/secp256k1";
import ECPairFactory from "ecpair";

const ECPair = ECPairFactory(ecc);

// Create a signer from your private key (in hex format)
export const createSigner = (privateKeyHex: string) => {
    // Convert hex private key to Buffer
    const privateKeyBuffer = Buffer.from(privateKeyHex, "hex");

    // Create ECPair from private key
    const keyPair = ECPair.fromPrivateKey(privateKeyBuffer);

    // Create DefaultSigner with P2TR address type (recommended for CAT-20)
    return new DefaultSigner(keyPair, AddressType.P2TR);
};
