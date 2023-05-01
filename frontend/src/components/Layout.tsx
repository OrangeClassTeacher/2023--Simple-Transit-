import React, { ReactNode } from 'react'
import { Meta } from './Meta'
import { Navbar } from './Navbar'
import Map from './Map'
import BottomSheet from './Bottomsheet'

interface MyProfs {
    children: ReactNode
}

export const Layout = ({ children }: MyProfs): JSX.Element => (
    <>
        <Meta />
        <div>
            <Navbar />
            <Map />
            <BottomSheet />
            <main>{children}</main>
        </div>
    </>
)

