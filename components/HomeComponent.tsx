import React from 'react'
import { useContextState } from '../context/productContext'
import CreateNFT from './nft/CreateNFT'
import NftCollections from './nft/NftCollections'
import ProductComponent from './products/ProductComponent'

const NftComponent = () => {
  const {currentNftScreen} = useContextState()

  return (
    <div>
      <div  className='py-4 px-10 text-center'>
        <h1 className='font-bold text-2xl'>Ecommerce Solana Defi, Your home of creating NFT, buying our product and seeing all your NFT collections</h1>
      </div>
      <div className='pt-4 mx-auto max-w-[1300px]'>
        {currentNftScreen === "create_nft" && <CreateNFT />}
        {currentNftScreen === "nft_collection" && <NftCollections />}
        {currentNftScreen === "product" && <ProductComponent />}
      </div>
    </div>
  )
}

export default NftComponent