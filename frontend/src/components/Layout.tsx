import React, { ReactNode } from 'react'
import { Meta } from './Meta'
import { Navbar } from './Navbar'
import Map from './Map'


interface MyProfs {
    children: ReactNode
}

export const Layout = ({ children }: MyProfs): JSX.Element => (
    <>
        <Meta />
        <div>
            <Navbar />
            <Map />
            <main>{children}</main>
        </div>
    </>
)

