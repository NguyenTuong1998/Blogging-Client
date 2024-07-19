
import CommentField from "@/components/Utils/CommentField"
import axios from "axios"

export const fetchcomment = async ({skip = 0, blog_id, setParentCommentCountFun,comment_array = null}) => {
  let res;

  await axios.post(process.env.VITE_SERVER_DOMAIN + 'get-blog-comment', {blog_id, skip})
  .then(({data}) => {
    data.map((comment: any) => {
      comment.childrenLevel = 0
    })

    setParentCommentCountFun((preVal: number) => preVal + data.length)

    if(comment_array == null){
      res = {results: data}
    }else{
      res = {results: [...comment_array, ...data]}
    }

    return res
  })
}

export default function CommentsContainer({blogClient, setBlogClient, commentsWrapper, setCommentsWrapper, totalParentCommentsLoaded, setTotalCommentsLoaded}: {blogClient: any, setBlogClient: any, commentsWrapper: boolean, setCommentsWrapper: any, totalParentCommentsLoaded: any, setTotalCommentsLoaded: any}) {
  return (
    <div className={`max-sm:w-full fixed ${commentsWrapper ? 'top-0 sm:right-0' : 'top-[100%] sm:right-[-100%]'} duration-700 max-sm:right-0 sm:top-0 
          w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 
          overflow-y-auto overflow-x-hidden`}>
        <div className="relative">
          <h1 className="text-xl  font-medium">Comments</h1>
          <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">{blogClient.title}</p>

          <button
            onClick={() => setCommentsWrapper(() => !commentsWrapper)}
            className="absolute top-0 right-0 flex justify-center items-center w-10 h-10 rounded-full bg-grey">
            <i className="fi fi-br-cross text-sm mt-1"></i>
          </button>
        </div>

        <hr className="border-grey my-8 w-[120%] -ml-10" />

        <CommentField blogClient={blogClient} setBlogClient={setBlogClient} totalParentCommentsLoaded={totalParentCommentsLoaded} setTotalCommentsLoaded={setTotalCommentsLoaded}/>
    </div>
  )
}
