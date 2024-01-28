import { useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useContextState } from '../../context/productContext'
import LoadingComponent from '../Loading'
import SingleProduct from './SingleProduct'

const ProductComponent = () => {
  const [solPrice, setSolPrice] = useState(0)
  const {isLoading, setIsLoading} = useContextState()
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://fakestoreapi.com/products').then((res) =>
        res.json(),
      ),
  })
  const { isPending:pending, error: errorFromSolUri, data:solanaPriceData } = useQuery({
    queryKey: ['rData'],
    queryFn: () =>
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd').then((res) =>
        res.json(),
      ),
  })

  if (isPending || pending){
    setIsLoading(true)
  }
  if (error || errorFromSolUri){
    setIsLoading(false)
  }
  if (data || solanaPriceData){
    setIsLoading(false)
  }

  useEffect(() => {
    if (solanaPriceData) {
      setIsLoading(false)
      setSolPrice(solanaPriceData.solana.usd);
    }
  }, [solanaPriceData]);


  return (
    <div>
      {isPending || pending?
        <LoadingComponent />
        : 
      <div className='flex justify-center flex-wrap'>
        {
          data?.map((product: Product) => (
            <SingleProduct key={product.id} item={product} solPrice={solPrice} />
          ))
        }
      </div>
      }
    </div>
  )
}

export default ProductComponent