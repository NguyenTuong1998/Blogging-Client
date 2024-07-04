
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
