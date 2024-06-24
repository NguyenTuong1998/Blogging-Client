'use client'
import { useContext, useEffect, useState, createContext } from 'react'
import { UserContext } from '@/app/layout'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

const  BlogEditor = dynamic(() => import('@/app/dashboard/blogs/editor/_components/blog-editor'),{ssr: false})
const  PublicForm = dynamic(() => import('@/app/dashboard/blogs/editor/_components/public-form'), {ssr: false})

const blogStructure = {
    title: '',
    banner: '',
    content: {},
    tags: [],
    des: '',
    author: { personal_info: {} }
}

export const EditorContext = createContext({})


export default function EditorPage() {

    const [blog, setBlog] = useState(blogStructure)
    const [editorState, setEditorState] = useState('editor')
    const [textEditor, setTextEditor] = useState({isReady: false})

    let { userAuth } = useContext(UserContext) as any;

    return (
        <EditorContext.Provider value={{blog, setBlog, editorState, setEditorState, textEditor, setTextEditor}}>
            {
                userAuth?.access_token === null ? <>{redirect('/signin')}</> 
                : editorState === 'editor' ? <BlogEditor /> : <PublicForm />
            }
        </EditorContext.Provider>
    )
}