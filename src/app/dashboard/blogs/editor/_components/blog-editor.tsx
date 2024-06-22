import { Button } from '@/components/ui/button'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import defaultBanner from '../../../../../../public/imgs/blog banner.png'
import { uploadImage } from '@/apiRequests/blogs'
import { useContext, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { EditorContext } from '../page'
export default function BlogEditor() {

  let {blog, blog : {title, banner, content, tags, des}, setBlog} = useContext(EditorContext) as any
  

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

  return (
    <>
    <Toaster/>
      <nav className='navbar'>
        <p className='max-md:hiđen  text-black line-clamp-1 w-full'>
          New Blog
        </p>
        <div className='flex gap-4 ml-auto'>
          <Button>Publish</Button>
          <Button variant="ghost">Save Draft</Button>
        </div>
      </nav>
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

            <hr className='w-full opacity-10 my-5 ' />
          </div>
        </section>
      </AnimationWraper>
    </>
  )
}
