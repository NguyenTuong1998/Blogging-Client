import Image from "next/image"
import {getDay} from "@/common/date"
import Link from "next/link"
export default function BlogPostCard({ content, author }: { content: any, author: any }) {


  let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content

  let { fullname, profile_img, username } = author
  return (
    <Link href='/' className="flex gap-8 items-center border-b border-grey pb-5 mb-4">

      <div className="w-full">

        <div className="flex gap-2 items-center mb-7">
          <Image src={profile_img} className="w-6 h-6 rounded-full" width={300} height={300} alt="image-blog" priority/>
          <p className="line-clamp-1 font-lora">Post by <Link href={`user/${username}`} className="underline"> @{fullname}</Link></p>
          <p className="min-w-fit text-dark-grey font-lora text-md">| {getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>

        <p className="my-3 text-xl font-lora leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">{des}</p>

        <div className="flex gap-4 mt-7">
          {/* {tags.length && tags.map((tag: any, index: any) => <span className="rounded-full bg-grey px-4 capitalize py-1" key={index}>{tag}</span> )} */}
          
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>
            {total_likes}
          </span>
        </div>

      </div>
      <div className="h-28 aspect-square bg-grey">
        <Image src={banner} alt="banner-blog" height={300} width={300} className="w-full h-full aspect-square object-cover" priority></Image>
      </div>
    </Link>
  )
}