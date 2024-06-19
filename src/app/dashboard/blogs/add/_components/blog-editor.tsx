import { Button } from '@/components/ui/button'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import defaultBanner from '../../../../../../public/imgs/blog banner.png'
import { uploadImage } from '@/apiRequests/blogs'
import { useRef } from 'react'
export default function BlogEditor() {

  let imgBannerRef = useRef(null)
  const handleBanner = async (e :any) => {
    let img = e.target.files[0]
    let formData = new FormData()
    formData.append('image', img) 
    
    try {
      const url = await uploadImage(formData)
      console.log(url);
      if(url){
        // imgBannerRef.current.src  = url
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
    
  }
  return (
    <>
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
                  ref={imgBannerRef}
                  src={defaultBanner}
                  alt="Picture of the author"
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
          </div>
        </section>
      </AnimationWraper>
    </>
  )
}
