import Image from 'next/image'
import React from 'react'
import { FaCartPlus, FaStar } from "react-icons/fa";
import { MdRemove, MdAdd, MdAddChart } from "react-icons/md";

type Props = {
    item: Product,
    solPrice: number
}

const SingleProduct = ({ item, solPrice }: Props) => {
    const amount = (item.price / solPrice).toFixed(3) 

  return ( 
    <div className='relative m-4 shadow-2xl h-[490px] w-fit p-8 rounded-xl'>
        <div className='text-center py-3 absolute top-1'>
            <h1>{item.category}</h1>
        </div>
        <div className='mt-4'>
            <Image src={item.image} className="w-[250px] max-h-[300px]" alt="" width={100} height={100} />
        </div>
        <div className='absolute pb-4 px-2 pt-4 w-full left-0 bottom-0 rounded-b-xl'>
            <h1 className='text-sm'>{item.title}</h1>
            <div className='text-[20px] flex p-2'>
                <h1 className='text-[16px] flex-1 font-semibold'>Price: {amount} SOL</h1>
                <FaCartPlus className='text-[#4d07b0] text-2xl'/>
            </div>
        </div>
          <div className='bg-[#4d07b0] w-[70px] py-1 absolute top-3 right-0'>
             <div className='flex items-center justify-center'>
                <h2 className='text-center font-semibold text-white pr-1'>{item.rating.rate}</h2>
                <FaStar className='text-yellow-500'/>
             </div>
        </div>
    </div>
  )
}

export default SingleProduct