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

export default function page({ params }: { params: { slug: string } }) {

  let [blogs, setBlogs] = useState(null)  as any

  const searchBlogs = ({page = 1, create_new_arr = false}) => {
    let query = params.slug
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

  const resetState = () => {
    setBlogs(null)
  }

  useEffect(() => {
    resetState()
    searchBlogs({page: 1, create_new_arr: true})
  },[params.slug])

  return (
    <>
      <Navbar />
      <section className="h-h-cover justify-center gap-10">
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
          </InpageNavigation>
        </div>
      </section>
    </>
  )
}
