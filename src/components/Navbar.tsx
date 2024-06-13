'use client'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/imgs/logo.png'
export default function Navbar() {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false)
    return (
        <>
            <nav className='navbar'>
                <Link href='/' className='flex-none w-10'>
                    <Image src={logo} className='w-full' alt="logo-dashboard" priority height="100"
                        width="100" />
                </Link>
                <div className={`absolute bg-white w-full left-0  
        top-full mt-0.border-b border-grey py-4 px-[5vw] md:border-0 
        md:block md:relative md:inset-0 md:p-0 md:w-auto ` + (searchBoxVisibility ? "show" : 'hide')}>
                    <input
                        type="text"
                        placeholder='Search'
                        className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'
                    />
                    <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl  text-dark-grey'></i>
                </div>
                <div className='flex item-center gap-3 md:gap-6 ml-auto'>
                    <button
                        onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
                        className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'>
                        <i className='fi fi-rr-search text-xl'></i>
                    </button>
                    <Link href='/editor' className='hidden md:flex gap-2 link'>
                        <i className='fi fi-rr-file-edit'></i>
                        <p>Write</p>
                    </Link>
                    <Link className='btn-dark py-2 ' href='/signin'>
                        <p>Sign In</p>
                    </Link>
                    <Link className='btn-light hidden md:block py-2' href='/signup'>
                        <p>Sign Up</p>
                    </Link>
                </div>
            </nav>
        </>
    )
}
