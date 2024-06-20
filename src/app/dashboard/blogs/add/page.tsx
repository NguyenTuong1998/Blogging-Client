'use client'
import { useContext, useEffect, useState, createContext } from 'react'
import { UserContext } from '@/app/layout'
import { redirect } from 'next/navigation'
import BlogEditor from '@/app/dashboard/blogs/add/_components/blog-editor'
import PublicForm from '@/app/dashboard/blogs/add/_components/public-form'

const blogStructure = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    des: '',
    author: {personal_info: {}}
}

export const EditorContext = createContext({})


export default function EditorPage() {

    const [blog, setBlog] = useState(blogStructure)
    const [editorState, setEditorSetate] = useState('editor')
    let { userAuth } = useContext(UserContext) as any;

    return (
        userAuth?.access_token === null ? 
            <>{redirect('/signin')}</> : editorState ? <BlogEditor /> : <PublicForm />

    )
}