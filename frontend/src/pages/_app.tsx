import { Layout } from '@/components/Layout'
import { useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import SessionProvider from 'next-auth/react'
import { Context } from '@/utils/Context'


export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [selectedPlace, setSelectedPlace] = useState("");
  return (
    <>
      <Context.Provider value={{ selectedPlace, setSelectedPlace }}>
        <Component {...pageProps} />
      </Context.Provider>


    </>
  )
}
