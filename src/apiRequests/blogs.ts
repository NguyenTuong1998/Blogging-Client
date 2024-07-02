import axios from "axios";
 interface blogType {
    activity: Object;
    blog_id: string;
    title: string;
    banner: string;
    des: string;
    tags: Array<string>;
    author: Object
}
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
