import { Button } from '@/components/ui/button'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import defaultBanner from '../../../../../../public/imgs/blog banner.png'
import { uploadImage } from '@/apiRequests/blogs'
import { useContext, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { EditorContext } from '../page'
import EditorJS from '@editorjs/editorjs'
import { Tools } from '@/components/Tools'

export default function BlogEditor() {

  let {blog, blog : {title, banner, content, tags, des}, 
        setBlog, textEditor,
        setTextEditor, setEditorState} = useContext(EditorContext) as any
  
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

  const handlePublicEvent = () => {
    // if(!banner.length) return toast.error('Upload a banner to publish it...')

    // if(!title.length) return toast.error('Write blog title to publish it...')

    if(textEditor.isReady){
      textEditor.save().then((result: any) => {
        console.log(result);
        
        if(result.blocks.length){
            setBlog({...blog, content: result})
            setEditorState('Publish')
        }else{
          return toast.error('Write something in your blog to publish it')
        }
        
      }).catch((err : any) => {
        console.log(err);
        
      });
    }
  }

  useEffect(() => {
    setTextEditor(new EditorJS({
      holder: 'textEditor',
      data: '' as any,
      tools: Tools,
      placeholder: "Let's write an awesome story!"
    }))
  },[])

  return (
    <>
      <nav className='navbar'>
        <p className='max-md:hiđen  text-black line-clamp-1 w-full'>
          New Blog
        </p>
        <div className='flex gap-4 ml-auto'>
          <Button onClick={handlePublicEvent}>Publish</Button>
          <Button variant="ghost">Save Draft</Button>
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
                  src={banner || defaultBanner}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
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
              placeholder='Blog Title'
              className='text-4xl w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
              onKeyDown={handleTitleKeydown}
              onChange={handleTitleChange}
            >
            </textarea>

            <hr style={{
              border: '1px red #000'
            }} className='w-full opacity-80 my-5 ' />

            <div id='textEditor' className='font-gelasio'></div>
          </div>
        </section>
      </AnimationWraper>
    </>
  )
}
