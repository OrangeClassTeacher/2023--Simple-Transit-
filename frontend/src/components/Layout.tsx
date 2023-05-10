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

    const [layerName, setLayerName] = useState("none")
    const handleLayerClick = (layer) => {
        setLayerName(layer)
    };
    return (


        <>
            <Meta />
            <div>
                <Navbar onLayerClick={handleLayerClick} />
                <Map layerName={layerName} />

                <main>{children}</main>
            </div>



        </>




    )
}

