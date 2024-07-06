
'use client'
import Loader from "@/components/loader"
import AnimationWraper from "@/common/AnimationWraper"
import BlogPostCard from "@/components/BlogPostCard"
import NodataMessage from "@/components/NodataMessage"
import { useContext } from "react"
import { BlogContext } from "@/app/AppClient"
import LoadMoreDataBtn from "@/components/LoadMore"

export default function LateStComponent() {

  const {blogs, getLatestBlogs, pageState, getBlogByCategory} = useContext(BlogContext) as any;

  return (
    <>
      {blogs == null ? <Loader/> : blogs.results.length ?
        blogs.results.map((blog: any, i : any) => {
           return (
            <AnimationWraper transition={{duration: 1, delay: i*.1}} key={i}>
                <BlogPostCard content = {blog} author = {blog.author.personal_info}/>
            </AnimationWraper>
           )
        }) : <NodataMessage message = "No blogs publised"/>
      }
      <LoadMoreDataBtn state={blogs} fetchDataFunc={(pageState == 'home' ? getLatestBlogs : getBlogByCategory)}/>
    </>
  )
}
