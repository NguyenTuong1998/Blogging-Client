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
    const [authVisitPage, setAuthVissitPage] = useState(false)
    const [editorState, setEditorSetate] = useState('editor')
    let { userAuth } = useContext(UserContext) as any;

    useEffect(() => {
        if (userAuth?.access_token === null || userAuth?.access_token === undefined) {
            return redirect('/signin')
        } setAuthVissitPage(true)
    }, [userAuth?.access_token])

    return (
        !authVisitPage ?
            <></> : editorState ? <BlogEditor /> : <PublicForm />

    )
}