import React, { ReactNode } from 'react'
import { Meta } from './Meta'
import { Navbar } from './Navbar'


interface MyProfs {
    children: ReactNode
}

export const Layout = ({ children }: MyProfs): JSX.Element => (
    <>
        <Meta />
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    </>
)

