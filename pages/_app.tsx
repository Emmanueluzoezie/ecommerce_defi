import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SolanaProvider } from '../context/solanaProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ContextProvider } from '../context/productContext'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(new QueryClient());
  return(
    <QueryClientProvider client={client}>
      <SolanaProvider>
        <ContextProvider>
          <div>
            <Toaster />
            <Component {...pageProps} />
          </div>
        </ContextProvider>
      </SolanaProvider>
    </QueryClientProvider>
  )
}
