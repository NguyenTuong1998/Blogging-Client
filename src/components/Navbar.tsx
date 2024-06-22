'use client'
import { useContext, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/imgs/logo.png'
import { UserContext } from '@/app/layout';
import UserNavigation from './Utils/UserNavigation';
import { NavigationMenuDemo } from './NavigationMenuDemo';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//shadcn ui
import { Button } from "@/components/ui/button"





export default function Navbar() {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [userNavPanel, setUserNavPanel] = useState(false)
    const { userAuth } = useContext(UserContext) as any;

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false)
        }, 200);
    }
    return (
        <>
            <nav className='navbar'>
                <Link href='/' className='flex-none w-10'>
                    <Image src={logo} className='w-full' alt="logo-dashboard" priority height="100"
                        width="100" />
                </Link>
                <div className={`
                        absolute bg-white w-full left-0  
                        top-full mt-0.border-b border-grey py-4 px-[5vw] md:border-0 
                        md:block md:relative md:inset-0 md:p-0 md:w-auto ` + (searchBoxVisibility ? "show" : 'hide')}>
                    <input
                        type="text"
                        placeholder='Search'
                        className='w-full md:w-auto bg-grey p-2  pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'
                    />
                    <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl  text-dark-grey'></i>
                </div>
                <NavigationMenuDemo />
                <div className='flex gap-3 items-center md:gap-6 ml-auto'>
                    
                    <Link href='/dashboard/blogs/editor' className='hidden text-base items-center md:flex gap-2'>
                        <Button className='text-base' variant="ghost"> <i className='fi fi-rr-file-edit px-1'></i> Write</Button>
                    </Link>
                    <button
                        onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
                        className='flex  w-12 h-12 rounded-full items-center justify-center'>
                        <i className='fi fi-rr-search text-xl'></i>
                    </button>
                    {
                        userAuth?.access_token ?
                            <>
                                <Link className='py-2 ' href='/dashboard/notification'>
                                    <button className='w-12  h-12 rounded-full  relative hover:bg-black/10'>
                                        <i className='fi fi-rr-bell text-2xl block'></i>
                                    </button>
                                </Link>
                                <div className='relative'>
                                    <button
                                        className='w-12 h-12 mt-1'
                                        onClick={() => setUserNavPanel(!userNavPanel)}
                                        onBlur={handleBlur}
                                    >
                                        <Avatar>
                                            <AvatarImage src={userAuth?.profile_img} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        {/* <img src={userAuth?.profile_img}
                                            alt="logo-dashboard"
                                            height="100"
                                            width="100"
                                            className='w-full h-full object-cover rounded-full'
                                        ></img> */}
                                    </button>
                                    {userNavPanel && <UserNavigation />}

                                </div>
                            </>
                            :

                            <>
                                <Link href='/signin'>
                                <Button className='rounded-xl px-6 text-base'>
                                     Sign In
                                </Button>
                                </Link>
                                <Link href='/signup'>
                                <Button variant="secondary" className='text-base rounded-xl px-6'>
                                     Sign Up
                                </Button>
                                </Link>
                            </>
                    }

                </div>
            </nav>
        </>
    )
}
