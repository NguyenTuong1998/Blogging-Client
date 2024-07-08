'use client'
import { useContext } from 'react'
import { UserContext } from '@/app/app-provider'
import Link from 'next/link'

export default function BlogInteracsion({blog}: {blog:any}) {

    let { blog_id, activity, activity: {total_likes, total_comments}, 
        author: {personal_info: {username, fullname}} } = blog as any

    let { userAuth} = useContext(UserContext) as any

    
  return (
    <div>
        <hr className='border-grey my-2' />

        <div className='flex gap-6 justify-between'>
            <div className='flex gap-3 items-center'>
                <button aria-label='like-blog-if-love' className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
                    <i className='fi fi-rr-heart'></i>
                </button>
                <p className='text-xl text-dark-grey'>{total_likes}</p>
            
                <button aria-label='commnet-blog' className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
                    <i className='fi fi-rr-comment-dots'></i>
                </button>
                <p className='text-xl text-dark-grey'>{total_comments}</p>
            </div>

            <div className='flex gap-6 items-center'>

                {userAuth?.username == fullname && <Link href={`/editor/${blog_id}`} className='underline hover:text-purple'>Edit</Link>}

                <Link aria-label='share-blog-to-twitter' href='/'><i className='fi fi-brands-twitter text-xl hover:text-twitter'></i></Link>

            </div>

        </div>

        <hr className='border-grey my-2' />
    </div>
  )
}
