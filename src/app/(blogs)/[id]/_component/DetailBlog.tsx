'use client'
import {useState, createContext} from 'react'
import Navbar from '@/components/Header/page'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import Link from 'next/link'
import { getDay } from '@/common/date'
import BlogInteracsion from '@/components/BlogInteracsion'
import BlogPostCard from '@/components/BlogPostCard'
import BlogContent from '@/app/(blogs)/[id]/_component/BlogContent'

type ContentBlog = {
  type: string,
  id: string,
  data: {}
}
export const BlogContext = createContext<{}>({})

export default function DetailBlog({blogStrure, similrBlog}: {blogStrure: any, similrBlog: any}) {

  const [blog, setBlog] = useState(blogStrure)
  

  let {title, content, banner, author: {personal_info: {fullname, username: author_username, profile_img}}, publishedAt} = blog

  return (
    <>

      <Navbar/>

      <BlogContext.Provider value={{blog, setBlog }}>

        <AnimationWraper>

          <div className='max-w-[900px] center py-10 max-lg:px-[5vw]'>

            <Image src={banner} priority alt={title} width={300} height={300} className='aspect-video'/>

            <div className='mt-12'>
              
              <h2 className='blog-title'>{title}</h2>

              <div className='flex max-sm:flex-col justify-between my-8'>
                <div className='flex gap-5 items-start'>

                  <Image src={profile_img} alt='about-author' priority width={300} height={300} className='w-12 h-12 rounded-full'></Image>

                  <p className='capitalize'>
                      {fullname}

                      <br />@

                      <Link className='underline' href={`/user/${author_username}`}>{author_username}</Link>
                  </p>
                  
                </div>

                <p className='text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5'>Published on {getDay(publishedAt)}</p>

              </div>

            </div>

            <BlogInteracsion/>

            {/* //content blog detail*/}

            <div className='my-12 font-lora blog-page-content'>
              {content[0].blocks && content[0].blocks.map((block: ContentBlog, i: number) => {
                return <div key={i} className='my-4 md:my-8'>
                  <BlogContent block = {block}/>
                </div>
              })}

            </div>

            {/* smilarBlogs */}
            {/* {similrBlog !== null && similrBlog.length ?  
              <>
                <h1 className='text-2xl mt-14 mb-10 font-medium'>Similar Blog</h1>

                {
                  similrBlog.map((blog: any, i:number) => {
                    let {author: {personal_info}} = blog
                    return (
                      <AnimationWraper key={i} transition={{duration: 1, delay: i*0.08}}>
                        <BlogPostCard content={blog} author={personal_info}/>
                      </AnimationWraper>
                    )
                  })
                }
              </>
              : ""
            } */}

          </div>
        </AnimationWraper>

      </BlogContext.Provider>

    </>
  )
}
