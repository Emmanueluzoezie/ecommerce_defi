import React from 'react'
import { useContextState } from '../../context/productContext'
import CreateNFT from './CreateNFT'
import NftCollections from './NftCollections'
import NftHeader from './NftHeader'

const NftComponent = () => {
  const {currentNftScreen} = useContextState()

  return (
    <div>
      <NftHeader />
      <div className='pt-4 mx-auto max-w-[1300px]'>
        {currentNftScreen === "create_nft" && <CreateNFT />}
        {currentNftScreen === "nft_collection" && <NftCollections />}
      </div>
    </div>
  )
}

export default NftComponent