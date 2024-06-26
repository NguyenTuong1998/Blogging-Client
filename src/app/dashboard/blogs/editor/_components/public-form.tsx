import { Toaster, toast } from 'react-hot-toast'
import AnimationWraper from '@/common/AnimationWraper'
import { Button } from '@/components/ui/button'
import { useContext, useState } from 'react'
import { EditorContext } from '@/app/dashboard/blogs/editor/page'
import Image from 'next/image'
import { Tags } from '@/components/Tags'
import axios from 'axios'
import { UserContext } from '@/app/layout'
import { redirect } from 'next/navigation'

let characterLimit = 200
let tagLimit = 10


export default function PublicForm() {
  const [value, setValue] = useState('JS')


  let { blog, blog: { title, banner, content, tags, des },
    setBlog, textEditor,
    setTextEditor, setEditorState } = useContext(EditorContext) as any

  let {userAuth: {access_token}} = useContext(UserContext)as any

  const handleTitleKeydown = (e: any) => {
    if (e.keyCode == 13) e.preventDefault();
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault()

      let tag = e.target.value

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] })
          setValue('')

        }
      } else {
        toast.error('You can add max tag limit')
      }

      e.target.value = ""
    }

  }

  const publicBlogs = (e: any) => {

    // if(e.target.className.includes('disable')) return;

    if (!title.length) return toast.error("Write blog title before publishing")

    if (!des.length || des.length > characterLimit) {
      return toast.error(`Write description about your blog withing ${characterLimit} characters to public`)
    }

    if (!tags.length) return toast.error("Enter at least 1 tag to help us rank your blog")

    let loadingToast = toast.loading('Publishing....')

    e.target.classList.add('disable')

    let blogObj = {title, banner, des, content, tags, draft: false}

    axios.post(process.env.VITE_SERVER_DOMAIN + 'create-blog', blogObj, {
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(() => {
      e.target.classList.remove('disable')

      toast.dismiss(loadingToast)
      toast.success("Published 🚀🚀")

      setTimeout(() => {
        redirect('/')
      }, 500)
    })
    .catch(({response}) => {
      e.target.classList.remove('disable')
      toast.dismiss(loadingToast)
      
      return toast.error(response.data.error)
    })
  }
  return (
    <AnimationWraper>

      <section className='w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4'>
        <Button variant="outline" className='w-12 h-10 z-10 absolute right-[5vw] top-[5%] mr-2' onClick={() => setEditorState('editor')}>
          <i className="text-xl fi fi-bs-arrow-small-left"></i>
        </Button>
        <Toaster />
        <div className='max-w-[550px] center'>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Preview</p>
          <Image
            className='w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4 '
            rel="stylesheet preload prefetch"
            src={banner}
            alt="Picture of the author"
            width={500}
            height={500}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority={true}
          />

          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {title}
          </h1>

          <p className="leading-7 [&:not(:first-child)]:mt-6">{des}</p>
        </div>
        <div className='border-grey lg:border-1 lg:pl-8'>
          <p className='text-dark-grey mb-2 mt-9'>Blog Title</p>

          <input
            type="text"
            placeholder='Blog Title'
            value={title} className='input-box pl-4'
            onChange={(e) => setBlog({ ...blog, title: e.target.value })} />

          <p className='text-dark-grey mb-2 mt-9'>Short description about your blog</p>

          <textarea
            placeholder="Type your message here."
            maxLength={characterLimit}
            defaultValue={des}
            className='h-40 resize-none leading-7 input-box pl-4'
            onChange={(e) => setBlog({ ...blog, des: e.target.value })}
            onKeyDown={handleTitleKeydown}
          />

          <p className='mt-1 text-dark-grey text-sm text-right'>{characterLimit - des.length} characters left</p>

          <p>Topics - (Helps is searching and ranking your blog post)</p>

          <div className='relative input-box pl-2 py-2 pb-4'>
            <input
              type="text"
              placeholder='Topic'
              className='sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white'
              onKeyDown={handleKeyDown}
            />

            {tags.map((tag: any, i: any) => {
              return <Tags tag={tag} tagIndex={i} key={i} />
            })}
          </div>

          <p className='mt-1 mb-4 text-dark-grey text-right'>
            {tagLimit - tags.length} Tags left
          </p>

          <Button className='my-3' onClick={publicBlogs}>Publish</Button>
        </div>

      </section>
    </AnimationWraper>
  )
}
