
'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "react-hot-toast"
import { lookInSession } from "@/common/session"
import axios from "axios"

export default function CommentField({blogClient, setBlogClient, totalParentCommentsLoaded, setTotalCommentsLoaded}: {blogClient: any, setBlogClient: any, totalParentCommentsLoaded: any, setTotalCommentsLoaded: any}) {

  let {_id, author: {_id: blog_author}} = blogClient

  let userInSeccion = lookInSession('user');

  let access_token = null;

  let username = null;

  let fullname = null;

  let profile_img = null;

  if(userInSeccion){
      access_token = JSON.parse(String(userInSeccion)).access_token
      fullname = JSON.parse(String(userInSeccion)).fullname
      profile_img = JSON.parse(String(userInSeccion)).profile_img
  }

  const [comment, setComment] = useState('')

  const handleComment = () => {
    if(!access_token) return  toast.error("Login first to leave a comment")
    
    if(!comment.length) return  toast.error("Write something to leave a comment...")
    
    axios.post(process.env.VITE_SERVER_DOMAIN + 'add-comment', {_id, blog_author, comment},{
      headers:{
        Authorization: `Bearer ${access_token}`
      }
    })
    .then(({data}) => {
      console.log(data);
      
      setComment("")

      data.commented_by = { personal_info : {username, profile_img, fullname}}

      let newCommentArr;

      data.childrenLevel = 0

      newCommentArr = [data]

      let parentCommentIncrementVal = 1

      setBlogClient({...blogClient, 
        comments: {...blogClient.comments, 
          results: {newCommentArr}, 
          activity: {...blogClient.activity, 
            total_comments: blogClient.activity.total_comments + 1, 
            total_parent_comments: blogClient.activity.total_parent_comments + parentCommentIncrementVal}
        }
      })

      setTotalCommentsLoaded((totalParentCommentsLoaded : any) => totalParentCommentsLoaded + parentCommentIncrementVal)
      
    })
    .catch(err => console.log(err))
    

  }

  return (
    <>
      <Toaster/>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment} 
        placeholder="Leave a comment..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[-150px] overflow-auto"
      ></textarea>
      <Button className="mt-5 rounded-full px-10 btn-dark" onClick={handleComment}>Comment</Button>
    </>
  )
}
