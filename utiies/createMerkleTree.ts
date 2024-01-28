import { generateSigner, signerIdentity, createSignerFromKeypair, publicKey, Keypair, Umi, } from '@metaplex-foundation/umi'
import { createTree } from '@metaplex-foundation/mpl-bubblegum'
import 'dotenv/config'

export const createMerkleTree = async (umi: Umi) => {
    try {
        const privateKeyString = process.env.PRIVATE_KEY;

        if (!privateKeyString) {
            throw new Error('Private key is undefined');
        }

        const keypair: Keypair = {
            publicKey: publicKey("Emm7xZB2rpWfNwbgNexEaFuKqqQB2VZ43e5NVJYhS1cB"),
            secretKey: new Uint8Array([198, 255, 71, 226, 146, 45, 236, 113, 38, 69, 186, 63, 185, 132, 161, 72, 96, 238, 202, 75, 206, 198, 244, 56, 222, 234, 141, 227, 54, 207, 62, 167, 204, 159, 95, 75, 78, 8, 159, 82, 60, 207, 230, 254, 209, 201, 18, 95, 211, 184, 93, 51, 1, 23, 216, 175, 165, 202, 67, 222, 187, 49, 0, 0])
        }

        const signer = await createSignerFromKeypair(umi, keypair);
        umi.use(signerIdentity(signer));

        const merkleTree = generateSigner(umi)

        // When we create a tree at this address.
        const builder = await createTree(umi, {
            merkleTree,
            maxDepth: 14,
            maxBufferSize: 64,
        });

        const tx = await builder.sendAndConfirm(umi);

        return {
            signer,
            tx
        }
    } catch (error) {
        return error
    }
}