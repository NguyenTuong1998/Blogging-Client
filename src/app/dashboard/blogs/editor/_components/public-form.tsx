import { Toaster, toast } from 'react-hot-toast'
import AnimationWraper from '@/common/AnimationWraper'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { EditorContext } from '@/app/dashboard/blogs/editor/page'
import Image from 'next/image'
let characterLimit = 200
export default function PublicForm() {

  let { blog, blog: { title, banner, content, tags, des },
    setBlog, textEditor,
    setTextEditor, setEditorState } = useContext(EditorContext) as any

  const handleTitleKeydown = (e: any) => {
    if (e.keyCode == 13) e.preventDefault();
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
            defaultValue={title}
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


        </div>

      </section>
    </AnimationWraper>
  )
}
