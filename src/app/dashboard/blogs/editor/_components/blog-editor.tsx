'use client'
import { Button } from '@/components/ui/button'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import defaultBanner from '../../../../../../public/imgs/blog banner.png'
import { uploadImage } from '@/apiRequests/blogs'
import { useContext, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { EditorContext } from '../page'
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { Tools } from '@/components/Tools'
import axios from 'axios'
import { UserContext } from '@/app/app-provider'
import { useRouter } from 'next/navigation'

export default function BlogEditor() {
  const editorRef = useRef<EditorJS | null>(null)
  const router = useRouter();
  const initialData = {
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Hello, this is the initial content loaded from JSON!",
        },
      },
    ],
    version: "2.29.1",
  };
  let {blog, blog : {title, banner, content, tags, des}, 
        setBlog, textEditor,
        setTextEditor, setEditorState} = useContext(EditorContext) as any

  let {userAuth: {access_token}} = useContext(UserContext)as any

  
  const handleBanner = async (e :any) => {
    let img = e.target.files[0]
    let formData = new FormData()
    formData.append('image', img) 
    
    try {
      let loadingToast = toast.loading('uploading banner ....')
      const url = await uploadImage(formData)
      console.log(url);
      if(url){
        setBlog({...blog, banner: url});
        toast.dismiss(loadingToast);
        toast.success('upload banner success');
      }
      
    } catch (error) {
      toast.error('upload banner failed ', error as any);
    }
  }

  const handleTitleKeydown = (e: any) => {
    if(e.keyCode == 13) e.preventDefault();
  }
  
  const handleTitleChange = (e: any) => {
    let input = e.target;

    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px'

    setBlog({...blog, title: input.value})
  }

  const handlePublicEvent = async() => {
    if(!banner.length) return toast.error('Upload a banner to publish it...')

    if(!title.length) return toast.error('Write blog title to publish it...')

      // if(textEditor.isReady){
    if(editorRef.current){
      await editorRef.current?.save().then((result: OutputData) => {
        console.log(result);

        if(result.blocks.length){
          setBlog({...blog, content: result})

          setEditorState('Publish')
        }else{
          return toast.error('Write something in your blog to publish it')
        }
      })
      .catch((err : any) => {
        console.log(err);
        
      });
    }

  }

  const handelSaveDraft = (e : any) => {

    // if(e.target.className.includes('disable')){
    //   return;
    // }

    if (!title.length) return toast.error("Write blog title before saving it as a draft")

    let loadingToast = toast.loading('Saving draft....')

    e.target.classList.add('disable')

    if(textEditor.isReady){
      textEditor.save().then( (content: any) => {

        let blogObj = {title, banner, des, content, tags, draft: true}
    
        axios.post(process.env.VITE_SERVER_DOMAIN + 'create-blog', blogObj, {
          headers:{
            'Authorization': `Bearer ${access_token}`
          }
        })
        .then(() => {
          e.target.classList.remove('disable')
    
          toast.dismiss(loadingToast)
          toast.success("Saved Draft 🚀🚀")
    
          setTimeout(() => {
            router.push('/')
          }, 500)
        })
        .catch(({response}) => {
          e.target.classList.remove('disable')
          toast.dismiss(loadingToast)
          
          return toast.error(response.data.error)
        })
         
      })
    }

  }
  

  useEffect(() => {
    // Initialize EditorJS
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor-container", // Specify the container element by its id
        autofocus: true, // Autofocus on the editor when it loads
        tools: Tools, // Add your custom tools here
        placeholder: "📝 Let's write an awesome 💁 ",
        data: content, // Pass the initial data to the editor
      });
      
      editorRef.current = editor
      if(!textEditor.isReady){
        setTextEditor(editor)
      }
    }
    
    // Cleanup function to destroy the editor when the component unmounts
    return () => {
      if (editorRef.current && editorRef.current.destroy) { 
        editorRef.current?.destroy();
      }
    };
    
  }, []);

  return (
    <>
      <nav className='navbar'>
        <h2 className=" max-md:hiđen  text-black line-clamp-1 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {title ? title : 'New Blog'}
        </h2>
        <div className='flex gap-4 ml-auto'>
          <Button onClick={handlePublicEvent}>Publish</Button>
          <Button onClick={handelSaveDraft} variant="ghost">Save Draft</Button>
        </div>
      </nav>
      <Toaster/>
      <AnimationWraper>
        <section>
          <div className='max-auto max-w-900px] w-full'>
            <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
              <label htmlFor="uploadBanner">
                <Image
                  // ref={imgBannerRef}
                  rel="stylesheet preload prefetch"
                  src={banner || defaultBanner}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                  priority={true}
                />
                <input 
                  type="file" 
                  id='uploadBanner' 
                  accept='.png, .jpg, .jpeg' 
                  hidden
                  onChange={handleBanner}
                />
              </label>
            </div>
            <textarea
              defaultValue={title}
              placeholder='Blog Title'
              className='text-4xl w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
              onKeyDown={handleTitleKeydown}
              onChange={handleTitleChange}
            >
            </textarea>

            <hr style={{
              border: '1px red #000'
            }} className='w-full opacity-80 my-5 ' />
            {/* <Editor initialData={initialData} /> */}
            <div id="editor-container">
              {/* <EmojiPicker open={false}/> */}
            </div>
          </div>
          
        </section>
      </AnimationWraper>
    </>
  )
}
