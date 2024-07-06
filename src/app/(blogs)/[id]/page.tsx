import axios from "axios";
import DetailBlog from "@/app/(blogs)/[id]/_component/DetailBlog";
type Props = {
    params: { id: string }
}

export let blogStrure = {
    title: '',
    des: '',
    content: [],
    tags:[],
    activity: { personal_info: {}},
    banner: '',
    publishedAt: ''
}

let similrBlog: any;

export default  async function page({ params }: Props) {

    await axios.post(process.env.VITE_SERVER_DOMAIN + 'get-blog', { blog_id: params.id })
    .then(async({data: blog}) => {
        similrBlog = null
        await axios.post(process.env.VITE_SERVER_DOMAIN + 'search-blogs', {tag: blog.blog.tags[0], limit: 6, eliminate_blog: params.id})
        .then(({data}) =>{
            
            similrBlog = data.blogs

        })

        blogStrure = Object.assign(blogStrure, blog.blog)

    })
    .catch(err => console.log(err))

    return (
        <>
            {!blogStrure && <div>Did not find the article !!!</div>}
            {blogStrure && <DetailBlog similrBlog={similrBlog} blogStrure={blogStrure} />}
        </>
    )
}
