'use client'
import { useState, useEffect, useContext } from "react";
import Navbar from "@/components/Header/page"
import axios from "axios";
import AnimationWraper from "@/common/AnimationWraper";
import Loader from "@/components/loader";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { UserContext } from "@/app/app-provider";
import AbloutUser from "@/app/(auth)/user/_components/ablout";
import { FilterPaginationData } from "@/common/FilterPaginationData";
import InpageNavigation from "@/components/InpageNavigation";
import LateStComponent from "@/app/blogs/latest/page";
import TrendingComponent from "@/app/blogs/trending/page";
import BlogPostCard from "@/components/BlogPostCard";
import NodataMessage from "@/components/NodataMessage";
import LoadMoreDataBtn from "@/components/LoadMore";
import { useRouter } from 'next/navigation'

export const profileDataStructure = {
  personal_info: {
    fullname: '',
    username: '',
    profile_img: '',
    bio: '',
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: ''
}
export default function page({ params }: { params: { slug: string } }) {

  const router = useRouter()

  let [profile, setProfile] = useState(profileDataStructure)

  let [loading, setLoading] = useState(true)

  let [blogs, setBlogs] = useState(null) as any

  const { userAuth } = useContext(UserContext) as any


  let { personal_info: {
    fullname, username: profile_username, profile_img, bio },
    account_info: { total_reads, total_posts },
    social_links, joinedAt } = profile

  const fetchUserProfile = () => {
    axios.post(process.env.VITE_SERVER_DOMAIN + 'get-profile', {
      username: params.slug,
    })
      .then(({ data: user }) => {
        console.log(user);
        
        if(user !== null){
          setProfile(user)
          getBlogs({ page: 1, user_id: user._id })
          setLoading(false)
        }else router.push('/not-found')
      })
      .catch(err => {
        setLoading(false)
        router.push('/not-found')
        console.log(err)
      })
  }

  const getBlogs = ({ page = 1, user_id }: { page: number, user_id: any }) => {

    //@ts-ignore
    user_id = user_id == undefined ? blogs.user_id : user_id

    axios.post(process.env.VITE_SERVER_DOMAIN + 'search-blogs', {
      author: user_id,
      page
    })
      .then(async ({ data }) => {
        let formatedDate = await FilterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: 'search-blogs-count',
          data_to_send: { author: user_id }
        })

        formatedDate.user_id = user_id

        setBlogs(formatedDate)

      })

  }

  const resetState = () => {
    setProfile(profileDataStructure)
    setLoading(true)
  }

  useEffect(() => {
    resetState()
    fetchUserProfile()
  }, [params.slug])

  return (
    <div>
      <Navbar />
      <AnimationWraper>
        {loading ? <Loader /> :
          <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
            <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[30%] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10">

              <Image
                src={profile_img}
                height={300}
                width={300}
                alt="profile-image"
                priority
                className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
              />

              <h1 className="font-medium text-2xl">@{profile_username}</h1>

              <p className="text-xl capitalize h-6">{fullname}</p>

              <p>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>

              <div className="flex gap-4 mt-2">

                {fullname == userAuth?.username &&

                  <Link href='/'>
                    <Button variant="secondary">Edit Profile</Button>
                  </Link>

                }

              </div>

              <AbloutUser className="max-md:hidden" bio={bio} social_links={social_links} joinedAt={joinedAt} />

            </div>

            <div className="max-md:mt-12 w-full">

              <InpageNavigation routes={['Blog Published', 'About']} defaultHidden={["About"]}>

                <>
                  {blogs == null ? <Loader /> : blogs.results.length ?
                    blogs.results.map((blog: any, i: any) => {
                      return (
                        <AnimationWraper transition={{ duration: 1, delay: i * .1 }} key={i}>
                          <BlogPostCard content={blog} author={blog.author.personal_info} />
                        </AnimationWraper>
                      )
                    }) : <NodataMessage message="No blogs publised" />
                  }
                  <LoadMoreDataBtn state={blogs} fetchDataFunc={getBlogs} />
                </>

                <AbloutUser className="" bio={bio} social_links={social_links} joinedAt={joinedAt}/>
              </InpageNavigation>

            </div>
          </section>
        }
      </AnimationWraper>

    </div>
  )
}
