import { toMetaplexFileFromBrowser } from "@metaplex-foundation/js";
import { createSignerFromKeypair, Keypair, publicKey, signerIdentity, Umi } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"

// const umi = createUmi('https://api.devnet.solana.com')

export const getMetadataUrl = async(
    name: string,
    symbol: string,
    description: string,
    image: string,
    umi: Umi
): Promise<string> => {
    try {
        const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

        if (!privateKey) {
            throw new Error("Private key not provided");
        }

        const secretKeyArray = JSON.parse(privateKey);

        const keypair: Keypair = {
            publicKey: publicKey("Emm7xZB2rpWfNwbgNexEaFuKqqQB2VZ43e5NVJYhS1cB"),
            secretKey: new Uint8Array(secretKeyArray),
        };
        const signer = await createSignerFromKeypair(umi, keypair);
        umi.use(signerIdentity(signer));

        const metadata = {
            name,
            symbol,
            description: description,
            image: image,
        };
        // const images = await toMetaplexFileFromBrowser(image)
        const bundlrUploader = createBundlrUploader(umi);
        const uri = await bundlrUploader.uploadJson(metadata);
        return uri;
    } catch (error) {
        throw error; // Rethrow the error for higher-level error handling
    }
}