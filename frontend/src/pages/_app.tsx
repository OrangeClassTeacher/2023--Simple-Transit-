import { Layout } from '@/components/Layout'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import SessionProvider from 'next-auth/react'



export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>

      <Component {...pageProps} />

    </>
  )
}
