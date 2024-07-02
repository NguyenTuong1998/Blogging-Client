'use client'
import { useContext } from "react";
import { BlogContext } from "@/app/AppClient";

export default function StoriesTagAll() {

  let categories = ['tech', 'marketing', 'seo', 'js', 'html', 'style', 'nextjs', 'reactjs', 'nodejs']

  const {blogs, setBlogs, pageState, setPageState} = useContext(BlogContext) as any;

  const loadBlogByCategory = (e: any) => {

    let category = e.target.innerText.toLowerCase();

    setBlogs(null)

    if(pageState == category){
      setPageState("home")
      return
    }

    setPageState(category)
     
  }

  return (
    <div className="flex gap-3 flex-wrap">
        {categories.map((category, i) => {
            return (<button
                        onClick={loadBlogByCategory}
                        key={i} 
                        className={`tag ` + (pageState === category ? 'bg-black text-white' : '')}>{category}
                    </button>)
        })}
    </div>
  )
}
