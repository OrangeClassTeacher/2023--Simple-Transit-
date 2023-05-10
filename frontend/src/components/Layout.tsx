import React, { ReactNode, useState } from 'react'
import { Meta } from './Meta'
import { Navbar } from './Navbar'
import Map from './Map'
import BottomSheet from './Bottomsheet'
import { Context } from '@/utils/Context'

interface MyProfs {
    children: ReactNode
}

export const Layout = ({ children }: MyProfs): any => {


    return (


        <>
            <Meta />
            <div>
                <Navbar />
                <Map />

                <main>{children}</main>
            </div>



        </>




    )
}

