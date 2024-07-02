
'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "@/components/loader"
import AnimationWraper from "@/common/AnimationWraper"
import MiniBlogPostCard from "@/components/MiniBlogPostCard"
import NodataMessage from "@/components/NodataMessage"

import { useContext } from "react"
import { BlogContext } from "@/app/AppClient"

export default function TrendingComponent() {

  const {trendingblogs} = useContext(BlogContext) as any;
//   const [trendingblogs, setTrendingBlogs ] = useState(null) as any


// const getTrendingBlogs = async () => {
//   await axios.get(process.env.VITE_SERVER_DOMAIN + 'trending-blogs')
//   .then(({data : {blogs}}) => {
//     setTrendingBlogs(blogs)
//   })
//   .catch(err => console.error(err))
// }

//   useEffect(() => {
//     getTrendingBlogs()
// },[])

  return (
    <>
      {trendingblogs == null ? <Loader/> : trendingblogs.length ?
        trendingblogs.map((blog: any, i : any) => {
           return (
            <AnimationWraper transition={{duration: 1, delay: i*.1}} key={i}>
                <MiniBlogPostCard blog={blog} index={i}/>
            </AnimationWraper>
           )
        }): <NodataMessage message = "No trending blogs publised"/>
      }
    </>
  )
}
