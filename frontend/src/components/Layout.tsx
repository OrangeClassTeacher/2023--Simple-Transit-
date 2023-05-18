import React, { ReactNode, useState } from 'react'
import { Meta } from './Meta'
import { Navbar } from './Navbar'
import Map from './Map'

interface MyProfs {
    children: ReactNode
}

export const Layout = ({ children }: MyProfs): any => {
    return (
        <>
            <Meta />
            <div className='relative'>
                <Navbar />
                <Map />
                <main>{children}</main>
            </div>
        </>
    )
}

