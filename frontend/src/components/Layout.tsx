import React, { ReactNode } from 'react'
import { Meta } from './Meta'
import { Navbar } from './Navbar'


interface MyProfs {
    children: ReactNode
}

export function Layout({ children }: MyProfs): any {
    return (
        <>
            <Meta />
            <div className='relative'>
                <Navbar />

                <main>{children}</main>
            </div>
        </>
    )
}

