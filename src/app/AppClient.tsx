'use client'
import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { activeTabRef } from "@/components/InpageNavigation"
import { FilterPaginationData } from "@/common/FilterPaginationData"

export const BlogContext = createContext<{}>({})

export default function AppClient({ children }: { children: React.ReactNode }) {
  
    const [blogs, setBlogs ] = useState(null) as any
    
    const [trendingblogs, setTrendingBlogs ] = useState(null) as any

    const [pageState, setPageState] = useState('home')

    const getLatestBlogs = async ({page = 1}) => {
        await axios.post(process.env.VITE_SERVER_DOMAIN + 'latest-blogs', {page})
        .then(async({data}) => {

            // @ts-ignore
            let formateData = await FilterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "all-latest-blogs-count"
            })
            
            setBlogs(formateData)
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

    const getBlogByCategory = async({page = 1}) => {
        await axios.post(process.env.VITE_SERVER_DOMAIN + 'search-blogs', {tag: pageState, page})
        .then(async({data}) => {

            let formateData = await FilterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "search-blogs-count",
                data_to_send: {tag: pageState}
            })

            setBlogs(formateData)
        })
        .catch(err => console.error(err))
    }
      
    useEffect(() => {

        activeTabRef.current.click();

        if(pageState == 'home'){
            getLatestBlogs({page: 1})
        }else{
            getBlogByCategory({page: 1})
        }

        if(!trendingblogs){
            getTrendingBlogs()
        }
        
    },[pageState])

    return (
    <BlogContext.Provider value={{blogs, setBlogs, trendingblogs, pageState, setPageState, getLatestBlogs, getBlogByCategory}}>
        {children}
    </BlogContext.Provider>
  )
}
