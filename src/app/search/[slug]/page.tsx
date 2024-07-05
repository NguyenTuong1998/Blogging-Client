'use client'
import { useState, useEffect } from "react"
import Navbar from "@/components/Header/page"
import InpageNavigation from "@/components/InpageNavigation"
import Loader from "@/components/loader"
import AnimationWraper from "@/common/AnimationWraper"
import BlogPostCard from "@/components/BlogPostCard"
import NodataMessage from "@/components/NodataMessage"
import LoadMoreDataBtn from "@/components/LoadMore"
import axios from "axios"
import { FilterPaginationData } from "@/common/FilterPaginationData"
import UserCard from "@/components/UserCard"

export default function page({ params }: { params: { slug: string } }) {
  let query = params.slug

  let [blogs, setBlogs] = useState(null)  as any
  let [users, setUser] = useState(null) as any

  const searchBlogs = ({page = 1, create_new_arr = false}) => {
   
    axios.post(process.env.VITE_SERVER_DOMAIN + 'search-blogs', { query, page})
    .then(async({data}) => {

      // @ts-ignore
      let formateData = await FilterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "search-blogs-count",
          data_to_send: {query},
          create_new_arr
      })
      
      setBlogs(formateData)
  })
  .catch(err => console.error(err))
  }

  const searchUser = () => {
    axios.post(process.env.VITE_SERVER_DOMAIN + 'search-users', { query})
    .then(({data: {users}}) => {
      
      setUser(users)
    })
  }

  const resetState = () => {
    setBlogs(null)
    setUser(null)
  }

  useEffect(() => {
    resetState()
    searchBlogs({page: 1, create_new_arr: true})
    searchUser()
  },[params.slug])


  const UseCardWrapper = () => {
    return (
      <>
        {
          users == null ? <Loader/> : 
          //@ts-ignore
            users.length ?  users.map((user, i) => {
              return (
                <AnimationWraper key={i} transition={{duration:1 , delay: i*0.08}}>
                  <UserCard user={user}/>
                </AnimationWraper>
              ) ;
            })
            : <NodataMessage message="New user found "/>
        }
      </>
    )
  }

  return (
    <>
      <Navbar />
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InpageNavigation routes={[`Search results from "${params.slug}"`, "Accounts Matched"]} defaultHidden={["Accounts Matched"]}>
            <>
              {blogs == null ? <Loader /> : blogs.results.length ?
                blogs.results.map((blog: any, i: any) => {
                  return (
                    <AnimationWraper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWraper>
                  )
                }) : <NodataMessage message="No blogs publised" />
              }
                <LoadMoreDataBtn state={blogs} fetchDataFunc={searchBlogs}/>
            </>
              <UseCardWrapper/>
          </InpageNavigation>
        </div>
        
        <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <h1 className="font-medium text-xl mb-8">Users related to search <i className="fi fi-rr-user mt-1 "></i></h1>
          <UseCardWrapper/>
        </div>
      </section>
    </>
  )
}
