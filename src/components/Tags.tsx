import { EditorContext } from "@/app/dashboard/blogs/editor/page"
import { useContext, useState } from "react"

export const Tags = ({ tag, tagIndex }: { tag: any, tagIndex: any }) => {

    let { blog, blog: { tags }, setBlog } = useContext(EditorContext) as any

    // const handleTagEdit = ( e: any) => {
    //     if(e.keyCode == 13 || e.key == 9 ){
    //         e.preventDefault()

    //         let currentTag = e.target.value

    //         tags[tagIndex] = currentTag

    //         setBlog({...blog, tags})


    //     }
    // }
    const handleTagDelete = () => {
        tags = tags.filter((t: any) => t !== tag)

        setBlog({ ...blog, tags })
    }
    return (
        <div
            className="relative mt-2 mr-2 px-5
      bg-white rounded-full inline-block hover:bg-opacity-50 pr-8"
        >
            <p className="outline-none">{tag}</p>

            <button
                onClick={handleTagDelete}
                className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2">
                <i className="fi fi-br-cross-small text-sm pointer-events-none"></i>
            </button>
        </div>
    )
}
