import Link from 'next/link'
import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { WalletButton } from '../context/solanaProvider'

const navLinks = [
    {
        name: "NFT Collections",
        href: "nft_collections",
        id: "2",
    }
]


const HeaderComponent = () => {
  return (
        <div className='flex p-4 items-center sticky top-0 bg-white z-40'>
            <div className='w-[100px]'>
                <h2>Logo</h2>
            </div>
            <ul className='flex-1'>
                {navLinks.map(nav => (
                    <Link href={nav.href}>
                        <li key={nav.id} className="font-semibold hover:bg-slate-200">{nav.name}</li>
                    </Link>
                ))}
            </ul>
            {/* <button className='bg-green-900 text-white font-semibold px-4 py-[4px] rounded-md'>Connect</button> */}
          <WalletButton />
         <div className='pl-4 relative'>
            <span className='font-bold absolute -top-4 right-1 text-xl'>0</span>
            <FaCartPlus className='text-[#4d07b0] text-3xl' />
         </div>
        </div>
    )
}

export default HeaderComponent