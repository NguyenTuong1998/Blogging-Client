import axios from "axios";
import DetailBlog from "@/app/(blogs)/[id]/_component/DetailBlog";
import type { Metadata, ResolvingMetadata } from 'next'
import { getDetailBlog } from "@/apiRequests/blogs";
import { baseOpenGraph } from "@/app/shared-metadata";

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const  result  = await getDetailBlog(String(params.id))
    const product = result.blogStrure
    return {
      title: product.title,
      description: product.des,
      openGraph: {
        ...baseOpenGraph,
        title: product.title,
        description: product.des,
        images: [
          {
            url: product.banner
          }
        ]
      },
  
    }
  }

export default  async function page({ params, searchParams }: Props) {

    let blogStrure = null

    let similrBlog = null

    try {
        const result = await getDetailBlog(String(params.id))
        
        blogStrure = result.blogStrure
        
        similrBlog = result.similrBlog

    } catch (error) {}

    return (
        <>
            {!blogStrure && <div>Did not find the article !!!</div>}
            {blogStrure && <DetailBlog similrBlog={similrBlog} blogStrure={blogStrure} />}
        </>
    )
}
