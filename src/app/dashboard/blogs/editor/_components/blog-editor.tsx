import { Button } from '@/components/ui/button'
import AnimationWraper from '@/common/AnimationWraper'
import Image from 'next/image'
import defaultBanner from '../../../../../../public/imgs/blog banner.png'
export default function BlogEditor() {

  const handleBanner = (e :any) => {
    let img = e.target.files[0]
    console.log(img);
    
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
