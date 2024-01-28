import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaCartPlus, FaStar } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { useContextState } from '../../context/productContext'
import { getNftAddress } from '../../utiies/storage'
import ScanCodeView from '../QRCodeScanner'
import AddedProduct from './AddedProduct'

const companyAddress = new PublicKey("Emm7xZB2rpWfNwbgNexEaFuKqqQB2VZ43e5NVJYhS1cB");

const AllAddedProduct = () => {
    const [solPrice, setSolPrice] = useState(0);
    const [solTotalPrice, setSolTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalP, setTotalT] = useState(0);
    const [nftAddress, setNftAddress] = useState<any>();
    const [showQrCode, setShowQrCode] = useState(false)
    const [showAllItems, setShowAllItems] = useState(true)
    
    const wallet = useWallet();
    const { connection } = useConnection();

    const { productArray, setProductArray, setPaymentOption, setOpenAddedProduct, paymentOption } = useContextState();

    const { isPending, error, data } = useQuery({
        queryKey: ['rData'],
        queryFn: () =>
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd').then((res) =>
                res.json(),
            ),
    });

    const totalPrice = productArray.reduce((total, product) => total + product.price, 0);

    useEffect(() => {
        if (data && nftAddress !== undefined && nftAddress?.length <= 0) {
            setSolPrice(data.solana.usd);
            setSolTotalPrice(Number((totalPrice / data.solana.usd).toFixed(3)));
        } else {
            const totalBeforeDiscount = Number(totalPrice / data.solana.usd);
            setTotalT(Number(totalBeforeDiscount.toFixed(3)));

            const referralDiscount = totalBeforeDiscount * 0.1;
            setDiscount(Number(referralDiscount.toFixed(3)));

            const totalAfterDiscount = totalBeforeDiscount - referralDiscount;

            setSolTotalPrice(Number(totalAfterDiscount.toFixed(3)));
        }
    }, [data, nftAddress, totalPrice]);

    useEffect(() => {
        const nftAddresses = getNftAddress();

        if (nftAddresses) {
            setNftAddress(nftAddresses);
        }
    }, []);

    const withdrawSOL = async() => {
        const notification = toast.loading(`Withdrawing ${solTotalPrice} SOL from your account... `);

        try {
            if (!wallet.connected) {
                throw new WalletNotConnectedError();
            }

            const fromPubkey = wallet.publicKey;

            if (!fromPubkey) {
                throw new Error("Wallet public key is null");
            }

            const feePayer = fromPubkey;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey,
                    toPubkey: new PublicKey("Emmy6u14ge99Xxck9EaVLF2KFt4eLrNVDBqdKwgbznu2"),
                    lamports: solTotalPrice * LAMPORTS_PER_SOL
                })
            );

            transaction.feePayer = feePayer;

            const { blockhash } = await connection.getRecentBlockhash();
            transaction.recentBlockhash = blockhash;

            // Check if signTransaction method exists before calling it
            if (!wallet.signTransaction) {
                toast.success("Wallet does not support signing transactions", { id: notification })
                throw new Error("Wallet does not support signing transactions");
            }

            const signedTransaction = await wallet.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());

            setOpenAddedProduct(false)
            setPaymentOption(false)
            setProductArray([])
            await connection.confirmTransaction(signature, 'finalized');
            toast.success("Payment Successfully", { id: notification });
        } catch (err) {
            toast.error("An error occurred while trying to withdraw 0.2 SOL", { id: notification });
        }
    }

    const handlePayWithQrCode = () => {
        setPaymentOption(false)
        setShowAllItems(false)
        setShowQrCode(true)
    }
    
    const handleCloseQrCode = () => {
        setShowQrCode(true)
        setOpenAddedProduct(false)

    }

  return (
      <div className='flex justify-center mx-auto w-full lg:w-[1200px] relative '>
          {showAllItems &&
              <div className='p-6 '>
                  <div className='overflow-scroll h-[550px] flex justify-centers flex-wrap'>
                      {productArray.map(product => (
                          <AddedProduct key={product.id} item={product} solPrice={solPrice} />
                      ))}
                  </div>
                  {nftAddress !== undefined && nftAddress?.length <= 0 ?
                      <div>
                          <h2>Create an NFT with us to get Discount</h2>
                      </div>
                      :
                      <div className='flex items-center text-sm md:text-lg'>
                          <div className='pt-4 px-4 flex items-center flex-1'>
                              <h2 className='font-semibold '>Total Before Discount: </h2>
                              <h2 className='pl-4'>{totalP}SOL</h2>
                          </div>
                          <div className='pt-4 px-4 flex items-center flex-1'>
                              <h2 className='font-semibold'>Discount: </h2>
                              <h2 className='pl-4'>{discount}SOL</h2>
                          </div>
                      </div>
                  }
                  <div className='flex justify-between px-4 items-center'>
                      <div className='flex items-center text-md'>
                          <h2 className='font-semibold'>Total: </h2>
                          <h2 className='pl-4'>{solTotalPrice}SOL</h2>
                      </div>
                      <button className='bg-[#4d07b0] mt-4 px-4 py-1 rounded-md text-white font-bold' onClick={() => setPaymentOption(true)}>Checkout</button>
                  </div>
              </div>
          }
          {paymentOption &&
              <div className='absolute top-60 w-full'>
                  <div className='flex justify-center w-full'>
                      <div className='bg-white w-[300px] p-4 shadow-2xl rounded-md'>
                          <div className='flex justify-end'>
                              <div className='w-fit p-2 hover:bg-gray-200 rounded-full cursor-pointer' onClick={() => setPaymentOption(false)}>
                                  <MdClose className='text-2xl' />
                              </div>
                          </div>
                          <div className='space-y-6 mt-6'>
                              <button className='text-center text-lg font-semibold border-[4px] py-1 rounded-md w-full border-[#4d07b0] text-[#4d07b0] hover:bg-[#4d07b0] hover:text-white' onClick={withdrawSOL}>Pay from wallet</button>

                              <button className='text-center text-lg font-semibold border-[4px] py-1 rounded-md w-full border-[#4d07b0] text-[#4d07b0] hover:bg-[#4d07b0] hover:text-white' onClick={handlePayWithQrCode}>Pay with QR code</button>
                          </div>
                      </div>
                  </div>
              </div>
          }
          {showQrCode &&
              <div className='absolute top-40 w-full'>
                  <div className='flex justify-center w-full bg-white py-10 px-6'>
                      <div className='relative'>
                          <div className='flex justify-end'>
                              <div className='w-fit a p-2 hover:bg-gray-200 rounded-full cursor-pointer' onClick={handleCloseQrCode}>
                                  <MdClose className='text-2xl' />
                              </div>
                          </div>
                          <ScanCodeView reference={companyAddress} name="Purchase Ecommerce Solana Defi" token='SOL' amount={solTotalPrice} />
                      </div>
                  </div>
              </div>
          }
      </div>
  )
}

export default AllAddedProduct