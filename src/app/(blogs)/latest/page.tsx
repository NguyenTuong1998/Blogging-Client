
'use client'
import { useEffect } from "react"
import { getLatestBlogs } from "@/apiRequests/blogs"

useEffect(() => {
    getLatestBlogs()
},[])
export default function LateStComponent() {
  return (
    <div>latest page</div>
  )
}
