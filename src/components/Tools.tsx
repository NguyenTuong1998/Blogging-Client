import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code' 
import Paragraph from '@editorjs/paragraph';
import { uploadImage } from '@/apiRequests/blogs'

const uploadImageByFile = (e: any) => {
    let formData = new FormData()
    formData.append('image', e) 
    return uploadImage(formData).then(url => {
        if(url){
            return {
                success: 1,
                file: {url}
            }
        }
    })
}

const uploadImageByUrl = (e : any) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        } catch (error) {
            reject(error)
        }
    })
    return link.then(url => {
        
        return {
            success: 1,
            file: {url}
        }
    })
}

export const Tools = {
    embed: Embed,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
    list: {
        class: List,
        inlineToolbar: true,
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByUrl, // Your backend file uploader endpoint
                uploadByFile: uploadImageByFile, // Your endpoint that provides uploading by Url
            }
          }
    },
    header: {
        class: Header,
        config:{
            placeholderl: 'Type Heading...',
            levels: [2,3],
            defaultLevel: 2
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
    },
    marker: Marker,
    inlineCode: InlineCode,
}
