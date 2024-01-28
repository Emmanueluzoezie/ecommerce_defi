import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useContextState } from '../../context/productContext';
import { getUserNfts } from '../../utiies/getUserNfts';
import { addItemAndSaveNft, getNftAddress } from '../../utiies/storage';

const apiKey = process.env.NEXT_PUBLIC_HELIUS_API

const NftCollections = () => {
    const [nftData, setNftData] = useState<any>()
    const [nftAddress, setNftAddress] = useState<any>()
    const { currentNftScreen, setCurrentNftScreen, setShowImage } = useContextState()
    const url = `https://api-devnet.helius.xyz/v0/token-metadata?api-key=${apiKey}`

    const handleCreateNftButton = () => {
        if (currentNftScreen === "create_nft") {
            setShowImage(true)
        } else {
            setCurrentNftScreen("create_nft")
            setShowImage(true)
        }
    }

    useEffect(() => {
        const nftAddresses = getNftAddress()

        if (nftAddresses){
            setNftAddress(nftAddresses)
            getUserNfts(url, nftAddresses)
                .then((data) => {
                    setNftData(data)
                })
                .catch((error) => {
                });
        }
    }, [])

  return (
    <div>
        <div>
              {nftData?.length < 0 || nftData?.length  === undefined?
                <div className='flex flex-col items-center mt-20'>
                    <div className='space-y-8'>
                        <h4 className='text-lg text-center'>You don't have any NFT in your collection. Click the button add NFT </h4>
                       <div className='flex justify-center'>
                              <button onClick={handleCreateNftButton} className={` rounded-md px-4 py-1 font-bold text-white bg-[#6206e3]`}>Create NFT</button>
                       </div>
                    </div>
                </div>
                : 
                <div className='flex justify-center flex-wrap'>
                    {nftData.map((nftItem: any) => (
                        <div className='max-w-[340px] shadow-2xl m-4 rounded-lg p-4'>
                            <div>
                                <Image className="w-full h-[350px] mb-4" alt='uploadedImage' width={100} height={100} src={nftItem?.offChainMetadata?.metadata?.image} />
                                <h1 className='font-semibold flex capitalize'>Name: <p className='pl-2 font-mono font-medium'>{nftItem?.offChainMetadata?.metadata?.name}</p></h1>
                                <h1 className='font-semibold flex uppercase'>Symbol: <p className='pl-2 font-mono font-medium'>{nftItem?.offChainMetadata?.metadata?.symbol}</p></h1>
                                <h1 className='font-semibold flex items-center truncate'>Mint: <p className='pl-2 font-mono font-medium text-sm'>{nftItem?.onChainMetadata?.metadata?.mint}</p></h1>
                                <div className='flex py-2 justify-center'>
                                    <Link href={`https://explorer.solana.com/address/${nftItem?.onChainMetadata?.metadata?.mint}?cluster=devent`}>
                                            <button className='border-2 px-4 py-1 border-[#6206e3] text-[#6206e3] hover:bg-[#6206e3] hover:text-white font-semibold rounded-md'>View on explorer</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    </div>
  )
}

export default NftCollections

// it add README.md
// git commit - m "first commit"
// git branch - M main
// git remote add origin https://github.com/Emmanueluzoezie/ecommerce_defi.git
// git push - u origin main