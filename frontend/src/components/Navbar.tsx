import React from 'react'
import Image from 'next/image'
export const Navbar = (): JSX.Element => (
    <>
        <div>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <button>Bus</button>
            <button>Tracking</button>
            <button>Traffic Light</button>
        </div>
    </>
)


