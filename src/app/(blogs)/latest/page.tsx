
'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "@/components/loader"
import AnimationWraper from "@/common/AnimationWraper"
import BlogPostCard from "@/components/BlogPostCard"
import NodataMessage from "@/components/NodataMessage"
import { useContext } from "react"
import { BlogContext } from "@/app/AppClient"

export default function LateStComponent() {

  // const [blogs, setBlogs ] = useState(null) as any
  
  const {blogs} = useContext(BlogContext) as any;

  // console.log(result);
  


// const getLatestBlogs = async () => {
//   await axios.get(process.env.VITE_SERVER_DOMAIN + 'latest-blogs')
//   .then(({data : {blogs}}) => {
//       setBlogs(blogs)
//   })
//   .catch(err => console.error(err))
// }

//   useEffect(() => {
//     getLatestBlogs()
// },[])

  return (
    <>
      {blogs == null ? <Loader/> : blogs.length ?
        blogs.map((blog: any, i : any) => {
           return (
            <AnimationWraper transition={{duration: 1, delay: i*.1}} key={i}>
                <BlogPostCard content = {blog} author = {blog.author.personal_info}/>
            </AnimationWraper>
           )
        }) : <NodataMessage message = "No blogs publised"/>
      }
    </>
  )
}
