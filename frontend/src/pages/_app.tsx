import { Layout } from '@/components/Layout'
import { useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import SessionProvider from 'next-auth/react'
import { Context } from '@/utils/Context'
import { userContext } from '@/utils/Context'
import { loginContext } from '@/utils/Context'
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [user, setUser] = useState({ name: "", email: "" })
  const [checkLogin, setCheckLogin] = useState<Boolean>(false)
  return (
    <>
      <Context.Provider value={{ selectedPlace, setSelectedPlace }}>
        <userContext.Provider value={{ user, setUser }}>
          <loginContext.Provider value={{ checkLogin, setCheckLogin }}>
            <Component {...pageProps} />
          </loginContext.Provider>

        </userContext.Provider>
      </Context.Provider>
    </>
  )
}
