import React from 'react'
import { useContextState } from '../../context/productContext'

const NftHeader = () => {
  const { currentNftScreen, setCurrentNftScreen, setShowImage } = useContextState()

  const  handleCreateNftButton = () => {
    if(currentNftScreen === "create_nft"){
      setShowImage(true)
    } else{
      setCurrentNftScreen("create_nft")
      setShowImage(true)
    }
  }

  return (
    <div className='px-4'>
      <div className='space-x-4'>
        <button onClick={() => setCurrentNftScreen("product")} className={` rounded-md px-4 py-1 font-bold border-[#4d07b0] ${currentNftScreen === "product" ? "text-white bg-[#6206e3]" : "text-[#4d07b0] border-[#4d07b0] border-2"}`}>Products</button>

        <button onClick={handleCreateNftButton} className={` rounded-md px-4 py-1 font-bold border-[#4d07b0] ${currentNftScreen === "create_nft" ? "text-white bg-[#6206e3]" : "text-[#4d07b0] border-[#4d07b0] border-2"}`}>Create NFT</button>
        
        <button onClick={() => setCurrentNftScreen("nft_collection")} className={` rounded-md px-4 py-1 font-bold border-[#4d07b0] ${currentNftScreen === "nft_collection" ? "text-white bg-[#6206e3]" : "text-[#4d07b0] border-[#4d07b0] border-2"}`}>NFT Collections</button>
      </div>
    </div>
  )
}

export default NftHeader