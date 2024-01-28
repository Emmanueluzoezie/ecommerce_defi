import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import { PublicKey } from "@metaplex-foundation/js";
import Image from 'next/image';
import { mintNFT } from '../../utiies/MintNft';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import axios from 'axios';
import { addItemAndSaveNftAddress } from '../../utiies/storage';
import { useContextState } from '../../context/productContext';
import LoadingComponent from '../Loading';

const jumiaDefi = new PublicKey("Emm7xZB2rpWfNwbgNexEaFuKqqQB2VZ43e5NVJYhS1cB");

const CreateNFT = () => {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false)
  const [mintAddress, setMintAddress] = useState("");
  const [mintSignature, setMintSignature] = useState("");
  const [loading, setLoading] = useState(false)
  const { setIsLoading } = useContextState()

  const { connection } = useConnection();
  const wallet = useWallet();

  const preset_key = process.env.NEXT_PUBLIC_PRESET_KEY
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME

  const umi = createUmi('https://api.devnet.solana.com');

  //Uploading to cloudinary so i can get the url
  const uploadImage = async (event:any) => {
    const notification = toast("Upoading Image...")
    try{
      if (event.target.files && event.target.files[0] && preset_key && cloudName) {
        const uploadedImage = event.target.files[0];
        const formData = new FormData();
        formData.append("file", uploadedImage)
        formData.append("upload_preset", preset_key)

        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
        .then(res => {
          setImage(res?.data?.secure_url)
      })
        .catch(err => console.log(err))   
        toast.success("Uploaded successfully", { id: notification })
      };
    } catch(error){
      toast.error("Oops! There was  an error uploading image. try again", {id: notification})
    }
  };

  const handleMintNft = useCallback(async () => {
    const notification = toast("Minting Nft...")
    setIsLoading(true)
    try{
      if (!wallet.publicKey) {
        toast.error("Oops! Wallet not connect", { id: notification })
        setIsLoading(false)
        return;
      };
      if (!image) {
        toast.error("Oops! There's no image", { id: notification })
        setIsLoading(false)
        return;
      };
      await mintNFT(
        connection,
        wallet,
        name,
        symbol?? "EJD",
        description,
        jumiaDefi,
        image,
        umi
      )
      .then(([mintAddress, signature]) => {
        addItemAndSaveNftAddress(mintAddress)
        setMintAddress(mintAddress)
        setMintSignature(signature);
        toast.success("NFT minted successfully", { id: notification })
        setIsLoading(false)
      });
    } catch(error){
      toast.error("Oops! An error occur while minting NFT", { id: notification })
      setIsLoading(false)
      console.log(error)
    }
  }, [wallet, connection, image]);

  return (
    <>
      {loading?
        <LoadingComponent />
        : 
        <div>
          <div className="mx-auto flex flex-col">
            <h2>{mintAddress}</h2>
            <h2>{mintSignature}</h2>

            {!mintAddress && !mintSignature && <div className="mx-auto text-center mb-2">
              {
                showImage ?
                  <div className='mt-20'>
                    {image.length > 0 && <Image className="w-[300px] mb-4" alt='uploadedImage' width={100} height={100} src={image} />}
                  </div>
                  :
                  <div className='flex flex-col mt-10'>
                    <form className='space-y-4 max-w-[500px] p-4 shadow-2xl rounded-2xl'>
                      <div>
                        <label className='block text-start pl-2 text-sm font-semibold text-gray-500 '>NFT name</label>
                        <input className="border-2 w-full outline-none border-gray-400 rounded-md p-2" type="text" onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div>
                        <label className='block text-start pl-2 text-sm font-semibold text-gray-500 '>Symbol (optional)</label>
                        <input className="border-2 w-full outline-none border-gray-400 rounded-md p-2" type="text" maxLength={4} onChange={(e) => setSymbol(e.target.value)} />
                      </div>
                      <div>
                        <label className='block text-start pl-2 text-sm font-semibold text-gray-500 '>Description (optional)</label>
                        <textarea className="border-2 w-full outline-none border-gray-400 rounded-md p-2" rows={3} onChange={(e) => setDescription(e.target.value)} />
                      </div>
                      <div>
                        <label className='block text-start pl-2 text-sm font-semibold text-gray-500 '>Image</label>
                        <input className="border-2 w-full rounded-md border-gray-500 p-2" type="file" onChange={uploadImage} />
                      </div>
                      <div className='py-4'>
                        {image.length > 0 &&
                          <button className='text-white bg-[#6206e3] w-full p-2 font-semibold text-xl rounded-md' onClick={() => setShowImage(true)}>Submit</button>}
                      </div>
                    </form>
                  </div>
              }
            </div>}
          </div>
          <div className="flex flex-row justify-center">
            <div className="relative group items-center">

              {image.length > 0 && showImage && !mintAddress && !mintSignature &&
                <div>
                  <div className="m-1 absolute -inset-0.2 bg-gradient-to-r from-[#9751f9] to-[#6206e3]
                        rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <button
                    className="px-8 m-2 mt-4 w-40 py-2 rounded-md btn animate-pulse bg-gradient-to-br from-[#9751f9] to-[#6206e3] font-semibold text-lg text-white"
                    onClick={handleMintNft}
                  >
                    <span>Mint NFT</span>

                  </button>
                </div>
              }

              {mintAddress && mintSignature &&
                <div>
                  <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
                    <p>Mint successful!</p>
                    <p className="text-xl mt-4 mb-2">
                      Mint address: <span className="font-bold text-lime-500">
                        <a
                          className="border-b-2 border-transparent hover:border-lime-500"
                          target='_blank'
                          rel='noopener noreferrer'
                          href={`https://explorer.solana.com/address/${mintAddress}?cluster=devent`}
                        >{mintAddress}</a>
                      </span>
                    </p>
                    <p className="text-xl">
                      Tx signature: <span className="font-bold text-amber-600">
                        <a
                          className="border-b-2 border-transparent hover:border-amber-600"
                          target='_blank'
                          rel='noopener noreferrer'
                          href={`https://explorer.solana.com/tx/${mintSignature}?cluster=devnet`}
                        >{mintSignature}</a>
                      </span>
                    </p>
                  </h4>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default CreateNFT