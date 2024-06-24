import { Toaster, toast } from 'react-hot-toast'
import AnimationWraper from '@/common/AnimationWraper'
import { Button } from '@/components/ui/button'
import {useContext} from 'react'
import { EditorContext } from '@/app/dashboard/blogs/editor/page'
export default function PublicForm() {

  let {setEditorState} = useContext(EditorContext) as any
  const handleBackEvent = () => {
    setEditorState('editor')
  }
  return (
    <AnimationWraper>
      <section>
        <Toaster/>
        <Button variant="outline" className='w-12 h-10 z-10' onClick={handleBackEvent}>
          <i className="fi fi-br-left"></i>
        </Button>
      </section>
    </AnimationWraper>
  )
}
