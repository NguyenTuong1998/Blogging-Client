
import Link from "next/link"
import Image from "next/image"
export default function UserCard({user} : {user:any}) {

    let { personal_info: {fullname, username, profile_img} } = user
    
  return (
    <Link  href={`/user/${username}`} className="flex gap-5 items-center mb-5">
        <Image priority src={profile_img} className="w-14 h-14 rounded-full" width={300} height={300} alt='avatar user' />
        <div>
            <h1 className="font-medium text-xl line-clamp-2">{fullname}</h1>
            <p className="text-dark-grey">@{username}</p>
        </div>
    </Link>
  )
}
