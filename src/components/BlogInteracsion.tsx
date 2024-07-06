'use client'
import { useContext } from 'react'
import { BlogContext } from '@/app/(blogs)/[id]/_component/DetailBlog'
import { UserContext } from '@/app/app-provider'
import Link from 'next/link'

export default function BlogInteracsion() {

    let {blog: { blog_id, activity, activity: {total_likes, total_comments}, 
        author: {personal_info: {username, fullname}}}, setBlog } = useContext(BlogContext) as any

    let { userAuth} = useContext(UserContext) as any

    
  return (
    <div>
        <hr className='border-grey my-2' />

        <div className='flex gap-6 justify-between'>
            <div className='flex gap-3 items-center'>
                <button className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
                    <i className='fi fi-rr-heart'></i>
                </button>
                <p className='text-xl text-dark-grey'>{total_likes}</p>
            
                <button className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
                    <i className='fi fi-rr-comment-dots'></i>
                </button>
                <p className='text-xl text-dark-grey'>{total_comments}</p>
            </div>

            <div className='flex gap-6 items-center'>

                {userAuth?.username == fullname && <Link href={`/editor/${blog_id}`} className='underline hover:text-purple'>Edit</Link>}

                <Link href='/'><i className='fi fi-brands-twitter text-xl hover:text-twitter'></i></Link>

            </div>

        </div>

        <hr className='border-grey my-2' />
    </div>
  )
}
