import Navbar from '@/components/Header/page'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import Link from 'next/link'
import { getDay } from '@/common/date'
import BlogInteracsion from '@/components/BlogInteracsion'
import SimilarPostCard from '@/components/SimilarPostCard'
import BlogContent from '@/app/(blogs)/[id]/_component/BlogContent'

type ContentBlog = {
  type: string,
  id: string,
  data: {}
}

export default function DetailBlog({blogStrure, similrBlog}: {blogStrure: any, similrBlog: any}) {

   let  blog = blogStrure
  
  let {title,des, content, banner, author: {personal_info: {fullname, username: author_username, profile_img}}, publishedAt} = blog

  return (
    <>

      <Navbar/>


        <AnimationWraper>

          <div className='max-w-[1200px] px-[25px] center py-10 max-lg:px-[5vw]'>

          <div className='mt-12'>

              <div className="all-posts-crumb"><Link className='text-black font-lora hover:underline text-xl' href="/">← All posts</Link></div>
              
              <h1 className='w-11/12 font-satoshi text-[48px] font-bold leading-[1.2em] mt-[30px] mb-[10px]'>{title}</h1>

              <p className='leading-[32px] text-[#1a1b1c] text-xl font-lora w-4/5 mt-[10px]'>{des}</p>

              <div className='flex max-sm:flex-col justify-between my-8'>
                <div className='flex items-center'>
                    <Link href={`/user/${author_username}`} className='flex items-center mr-[10px]'>

                      <Image src={profile_img} alt='about-author' priority width={300} height={300} className='img w-12 h-12 rounded-full mr-[10px]'></Image>

                      <div className="mr-[4px] font-lora text-[#131112] text-xl leading-[1.5em]">Post by</div>
                      
                      <div className="underline text-[#131112] text-xl leading-[1.5em] font-lora ">{author_username}</div>

                    </Link>

                    <div className="mr-[10px] text-xl leading-[1.5em] font-lora text-dark-grey ">|</div>

                    <div className="my-[10px] text-xl leading-[1.5em] font-lora text-dark-grey ">{getDay(publishedAt)}</div>

                </div>

              </div>

            </div>

            <Image 
              src={banner} 
              alt={title} 
              width={100} 
              quality={60}  
              height={100} 
              sizes='75vm' 
              style={{width: '100%', height: '100%'}} 
              priority
              className='img my-[40px] rounded-xl aspect-video'
            />

          
            <BlogInteracsion blog={blog}/>

            {/* //content blog detail*/}

            <div className='grid lg:grid-cols-[2fr_1fr] lg:grid-rows-auto lg:gap-x-[60px] lg:gap-y-[16px] text-left mb-[50px]'>

              <div className='my-12 font-lora blog-page-content'>
                {content[0].blocks && content[0].blocks.map((block: ContentBlog, i: number) => {
                  return <div key={i} className='my-4 md:my-8'>
                    <BlogContent block = {block}/>
                  </div>
                })}

              </div>

              {/* smilarBlogs */}
              {similrBlog !== null && similrBlog.length ?  
                <div>
                  <h2 className='text-2xl mt-14 mb-10 font-medium'>Related articles</h2>

                  {
                    similrBlog.map((blog: any, i:number) => {
                      let {author: {personal_info}} = blog
                      return (
                        <AnimationWraper key={i} transition={{duration: 1, delay: i*0.08}}>
                          <SimilarPostCard content={blog} author={personal_info}/>
                        </AnimationWraper>
                      )
                    })
                  }
                </div>
                : ""
              }
            </div>

          </div>
        </AnimationWraper>


    </>
  )
}
