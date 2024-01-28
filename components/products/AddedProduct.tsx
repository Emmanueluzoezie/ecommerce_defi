import Image from 'next/image'
import React from 'react'
import { toast } from 'react-hot-toast';
import { FaCartPlus, FaStar } from "react-icons/fa";
import { MdRemove, MdAdd, MdAddChart, MdDelete } from "react-icons/md";
import { useContextState } from '../../context/productContext';

type Props = {
    item: Product,
    solPrice: number
}

const AddedProduct = ({ item, solPrice }: Props) => {
    const { productArray, setProductArray } = useContextState()

    const removeProduct = (index: number) => {
        // Create a copy of the array
        const newArray = [...productArray];
        // Remove the item at the specified index
        newArray.splice(index, 1);
        // Update the state with the new array
        setProductArray(newArray);
    };

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
                    <MdDelete className='text-[#9f3333] text-2xl cursor-pointer' onClick={() => removeProduct(item.id)} />
                </div>
            </div>
            <div className='bg-[#4d07b0] w-[70px] py-1 absolute top-3 right-0'>
                <div className='flex items-center justify-center'>
                    <h2 className='text-center font-semibold text-white pr-1'>{item.rating.rate}</h2>
                    <FaStar className='text-yellow-500' />
                </div>
            </div>
        </div>
    )
}

export default AddedProduct