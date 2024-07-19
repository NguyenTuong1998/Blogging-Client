'use client'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/app/app-provider'
import Link from 'next/link'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { lookInSession } from '@/common/session'
import CommentsContainer from '@/components/CommentsContainer'
import { fetchcomment } from '@/components/CommentsContainer'

export default function BlogInteracsion({blog, likeByUser}: {blog:any, likeByUser: boolean}) {

    let userInSeccion = lookInSession('user');

    let access_token = null;
    if(userInSeccion){
        access_token = JSON.parse(String(userInSeccion)).access_token
    }

    const [isLikeByUser, setLikedByUser] = useState(likeByUser)

    const [blogClient, setBlogClient] = useState(blog)

    const [commentsWrapper, setCommentsWrapper] = useState(false)

    const [totalParentCommentsLoaded, setTotalCommentsLoaded] = useState(0)

    let { _id, blog_id, activity, activity: {total_likes, total_comments}, 
    author: {personal_info: {username, fullname}} } = blogClient as any


    const handleLike = () => {
        if(access_token){
            setLikedByUser(preVal => !preVal)

            !isLikeByUser ? total_likes++ : total_likes--

            setBlogClient({...blogClient, activity: {...activity, total_likes}})

            axios.post(process.env.VITE_SERVER_DOMAIN + 'like-blog', {
                _id, isLikeByUser
            }, {
                headers:{
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({data}) => console.log(data))
            .catch(err => console.log(err))


        }else toast('Please login to like this blog 😭😭')
    }

    useEffect(() => {

        setCommentsWrapper(false)

        if(access_token){
            axios.post(process.env.VITE_SERVER_DOMAIN + 'isLiked-by-user', {_id},{
                headers:{
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({data}) => setLikedByUser(Boolean(data.result)))
            .catch(err => console.log(err))
        }

        if(blogClient){
            (async() => {
                
                blogClient.comments = await fetchcomment({blog_id: blogClient._id, setParentCommentCountFun: setTotalCommentsLoaded})

                setBlogClient({...blogClient})
            })
        }
    },[])

    
  return (
    <div>
        <Toaster/>
        <CommentsContainer blogClient={blogClient} 
            setBlogClient={setBlogClient} 
            commentsWrapper={commentsWrapper} 
            setCommentsWrapper={setCommentsWrapper}
            totalParentCommentsLoaded={totalParentCommentsLoaded}
            setTotalCommentsLoaded={setTotalCommentsLoaded}
        />
        <hr className='border-grey my-2' />

        <div className='flex gap-6 justify-between'>
            <div className='flex gap-3 items-center'>
                <button
                    onClick={handleLike} 
                    aria-label='like-blog-if-love' 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isLikeByUser ? 'bg-red/20 text-red' : 'bg-grey/80'}`}>
                    <i className={`fi fi-${isLikeByUser ? 'sr' : 'rr'}-heart`}></i>
                </button>
                <p className='text-xl text-dark-grey'>{total_likes}</p>
            
                <button onClick={() => setCommentsWrapper(preval => !preval) } aria-label='commnet-blog' className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80'>
                    <i className='fi fi-rr-comment-dots'></i>
                </button>
                <p className='text-xl text-dark-grey'>{total_comments}</p>
            </div>

            <div className='flex gap-6 items-center'>

                {userInSeccion && JSON.parse(String(userInSeccion)).username == fullname && <Link href={`/dashboard/editor/${blog_id}`} className='underline hover:text-purple'>Edit</Link>}

                <Link aria-label='share-blog-to-twitter' href='/'><i className='fi fi-brands-twitter text-xl hover:text-twitter'></i></Link>

            </div>

        </div>

        <hr className='border-grey my-2' />
    </div>
  )
}
