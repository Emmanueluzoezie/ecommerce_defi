import React from 'react'
import { useContextState } from '../../context/productContext'
import ProductComponent from '../products/ProductComponent'
import CreateNFT from './CreateNFT'
import NftCollections from './NftCollections'
import NftHeader from './NftHeader'

const NftComponent = () => {
  const {currentNftScreen} = useContextState()

  return (
    <div>
      <div  className='py-4 text-center'>
        <h1>ALL</h1>
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