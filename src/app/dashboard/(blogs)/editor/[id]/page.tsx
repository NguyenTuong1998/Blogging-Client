
import axios from "axios";
import EditorPage from "@/app/dashboard/(blogs)/editor/page";
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }



export default async function PageEditBlog({params}: Props) {
    let product = null
    await axios.post(process.env.VITE_SERVER_DOMAIN + 'get-blog', { blog_id: params.id, draft: true, mode: 'edit'})
    .then(({data: blog}) => {
        product = blog.blog
        
    })
    .catch(err => console.log(err));
     
  return (
    <EditorPage DestrureBlog={product} />
  )
}
