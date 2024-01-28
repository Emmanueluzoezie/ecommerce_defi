import { Metaplex, toMetaplexFileFromBrowser, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Umi } from "@metaplex-foundation/umi";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { getMetadataUrl } from "./uploadMetadata";

export const  mintNFT = async(
    connection: Connection,
    // networkConfiguration: string,
    wallet: WalletContextState,
    name: string,
    symbol: string,
    description: string,
    collection: PublicKey,
    image: string,
    umi: Umi
): Promise<[string, string]> => {

    try {
        const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet));

        const uri = await getMetadataUrl(name, symbol, description, image, umi);

        const { nft, response } = await metaplex.nfts().create({
            name,
            symbol,
            uri,
            sellerFeeBasisPoints: 0,
            tokenOwner: wallet.publicKey ?? metaplex.identity().publicKey,
            mintTokens: true,
            collection,
        });
        return [nft.address.toBase58(), response.signature];
    } catch (error) {
        throw error;
    }
}