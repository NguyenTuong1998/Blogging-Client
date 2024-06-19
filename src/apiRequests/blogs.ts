import axios from "axios";

export const uploadImage = async (file: any) => {
    let url = null;
    await axios.post(process.env.VITE_SERVER_DOMAIN + 'upload-image', file)
    .then((res) =>{
        url = res.data.data.url
    } 
)
    .catch(err => console.error(err))

    return url
}