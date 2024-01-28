import Link from 'next/link'
import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { useContextState } from '../context/productContext'
import { WalletButton } from '../context/solanaProvider'
import NftHeader from './nft/NftHeader'

const HeaderComponent = () => {
    const { setOpenAddedProduct, productArray } = useContextState()

    const handleShowAddedProduct = () => {
        if(productArray.length <= 0){
            return
        } else {
            setOpenAddedProduct(true)
        }
    }

  return (
      <div className='sticky top-0 bg-white z-40'>
          <div className='flex items-center justify-between p-4'>
              <div className='w-[250px] cursor-pointer'>
                  <h2 className='font-bold text-xl'>Ecommerce Solana Defi</h2>
              </div>
              <div className='flex-1 hidden md:flex'>
                  <NftHeader />
              </div>

              <WalletButton />

              <div className='pl-4 relative cursor-pointer' onClick={handleShowAddedProduct}>
                  <span className='font-bold absolute -top-4 right-1 text-xl'>{productArray.length}</span>
                  <FaCartPlus className='text-[#4d07b0] text-3xl' />
              </div>
          </div>
          <div className='md:hidden'>
              <NftHeader />
          </div>
        </div>
    )
}

export default HeaderComponent