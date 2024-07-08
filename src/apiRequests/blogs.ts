import axios from "axios";

export const uploadImage = async (file: any) => {
    let url = null;
    await axios.post(process.env.VITE_SERVER_DOMAIN + 'upload-image', file)
    .then( ({ data: {data} }) => {
        url = data.secure_url
    } 
)
    .catch(err => console.error(err))

    return url
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

export const getDetailBlog = async (paramms: string) => {
    let similrBlog = null

    await axios.post(process.env.VITE_SERVER_DOMAIN + 'get-blog', { blog_id: paramms })
    .then(async({data: blog}) => {
        similrBlog = null
        await axios.post(process.env.VITE_SERVER_DOMAIN + 'search-blogs', {tag: blog.blog.tags[0], limit: 6, eliminate_blog: paramms})
        .then(({data}) =>{
            
            similrBlog = data.blogs

        })

        blogStrure = Object.assign(blogStrure, blog.blog)

    })
    .catch(err => console.log(err))

    return {blogStrure, similrBlog};
}