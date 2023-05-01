import React from 'react'
import Navbar from './Navbar'

// export interface Modal {
//     modal: boolean
// }

export default function UserModal({ modal }: { modal: boolean }): JSX.Element {
    const dn = modal ? "block" : "none"
    return (
        <div className='rounded-sm w-3/12 bg-white'
            style={{ display: dn }}
        >
            <div className='h-full flex-col accSettings'>
                <img src="icon.png" alt="profile image" width={60} height={60} className="self-center" />
                <p className='text-center text-xl'>Tamir Khuderbaatar</p>
                <p className='text-center text-xs'>htamir80@gmail.com</p>
                <p className='drop-shadow-md text-black'>Chat</p>
                <p className='drop-shadow-md text-black'>Friends</p>
                <p className='drop-shadow-md text-black'>Privacy and Policy</p>
                <p className='drop-shadow-md text-black'>Settings</p>
                <p className='bg-blue-600 w-30 text-center rounded-xl text-white'>+Add account</p>
                <p className='bg-red-600 w-20 text-center rounded-xl text-white'>Log Out</p>
            </div>
        </div>
    )
}
