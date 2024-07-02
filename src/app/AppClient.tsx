'use client'
import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { activeTabRef } from "@/components/InpageNavigation"
export const BlogContext = createContext<{}>({})

interface PageState {
    tag: string;
  }

export default function AppClient({ children }: { children: React.ReactNode }) {
  
    const [blogs, setBlogs ] = useState(null) as any
    
    const [trendingblogs, setTrendingBlogs ] = useState(null) as any

    const [pageState, setPageState] = useState('home')

    let filterTag: PageState = {
        tag: pageState
    };
    const getLatestBlogs = async () => {
        await axios.get(process.env.VITE_SERVER_DOMAIN + 'latest-blogs')
        .then(({data : {blogs}}) => {
            setBlogs(blogs)
        })
        .catch(err => console.error(err))
    }
    
    const getTrendingBlogs = async () => {
        await axios.get(process.env.VITE_SERVER_DOMAIN + 'trending-blogs')
        .then(({data : {blogs}}) => {
          setTrendingBlogs(blogs)
        })
        .catch(err => console.error(err))
    }

    const getBlogByCategory = async(tag: PageState) => {
        let params = {tag: pageState}
        await axios.post(process.env.VITE_SERVER_DOMAIN + 'search-blogs', {tag: params.tag})
        .then(({data : {blogs}}) => {
            setBlogs(blogs)
        })
        .catch(err => console.error(err))
    }
      
    useEffect(() => {

        activeTabRef.current.click();

        if(pageState == 'home'){
            getLatestBlogs()
        }else{
            getBlogByCategory()
        }

        if(!trendingblogs){
            getTrendingBlogs()
        }
        
    },[pageState])

    return (
    <BlogContext.Provider value={{blogs, setBlogs, trendingblogs, pageState, setPageState}}>
        {children}
    </BlogContext.Provider>
  )
}
