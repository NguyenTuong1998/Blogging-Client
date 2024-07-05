import Link from "next/link"
import Image from "next/image"
import { getDay } from "@/common/date"

export default function MiniBlogPostCard({blog, index} : {blog:any, index: number}) {

    let {title, blog_id: id, author: {personal_info: { fullname, username, profile_img}}, publishedAt} = blog
  return (
    <Link href='/' className="flex gap-5 mb-4">
        <h1 className="blog-index">{index < 10 ? "0" + (++index) : index}</h1>
        <div >
            <div className="flex gap-2 items-center mb-7">
                <Image src={profile_img} className="w-6 h-6 rounded-full" width={300} height={300} alt="image-blog"/>
                <p className="line-clamp-1">{fullname} @{username}</p>
                <p className="min-w-fit">{getDay(publishedAt)}</p>
            </div>
            <h1 className="blog-title">{title}</h1>
        </div>

    </Link>
  )
}
