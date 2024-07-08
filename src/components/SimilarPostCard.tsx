import Image from "next/image"
import {getDay} from "@/common/date"
import Link from "next/link"

export default function SimilarPostCard({ content, author }: { content: any, author: any }) {
 

    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content

    let { fullname, profile_img, username } = author
    return (
      <Link href={`${id}`} className="flex items-center border-b border-grey pb-5 mb-5 text-[14px]">
        <div className="h-20 w-48 aspect-square bg-grey">
          <Image src={banner} alt="banner-blog" height={300} width={300} className="border-[2px] border-solid border-[rgba(26,27,28,0.07)] rounded-[5px] w-[80vm] h-full aspect-square object-cover" priority></Image>
        </div>
        {/* <div className="w-full"> */}
          <h1 className="text-[#131112] font-[550] ml-3 font-satoshi text-[1em] leading-[1.5em] no-underline">{title}</h1>
        {/* </div> */}
        
      </Link>
    )
}
