import Image from 'next/image'
import React from 'react'
import { toast } from 'react-hot-toast';
import { FaCartPlus, FaStar } from "react-icons/fa";
import { MdRemove, MdAdd, MdAddChart } from "react-icons/md";
import { useContextState } from '../../context/productContext';

type Props = {
    item: Product,
    solPrice: number
}

const SingleProduct = ({ item, solPrice }: Props) => {
    const {productArray, setProductArray} = useContextState()

    const handleAddProduct = () => {
        const notification = toast("Adding item to cart...")
        const isProductAlreadyAdded = productArray.some((product) => product.id === item.id);

        if (!isProductAlreadyAdded) {
            setProductArray((prevProducts) => [...prevProducts, item]);
            toast.success("Successfully added to cart...", { id: notification })
        } else {
            toast.error("Product is already in the cart!", { id: notification })
        }
    }

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
                  <FaCartPlus className='text-[#4d07b0] text-2xl' onClick={handleAddProduct}/>
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