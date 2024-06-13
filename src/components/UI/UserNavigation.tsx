import { UserContext } from "@/app/layout";
import AnimationWraper from "@/common/AnimationWraper";
import { removeFormSession } from "@/common/session";
import Link from "next/link";
import { useContext } from "react";
const UserNavigation = () => {
  const { userAuth, setUserAuth } = useContext(UserContext) as any;
  
  const signoutUser = () => {
    removeFormSession('user')
    setUserAuth({access_token : null})
  }
  return (
    <AnimationWraper
      className="absolute right-0 z-58"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link href='/editor' className="flex gap-2 md:hiddenlink link pl-8 py-4">
          <i className='fi fi-rr-file-edit'></i>
          <p>Write</p>
        </Link>

        <Link href={`/user/${userAuth?.username}`} className="link pl-8 py-4">
          <p>Profile</p>
        </Link>

        <Link href='/dashboard/blogs' className="link pl-8 py-4">
          <p>Dashboard</p>
        </Link>

        <Link href='/setting/edit-profile' className="link flex pl-8 py-4">
          <p>Setting</p>
        </Link>
        <span className="absolute border-t border-grey w-[200%]"></span>
        <button 
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signoutUser}
        >
          <h1 className="font-bold text-xl ml-1">Sign Out</h1>
          <p className="text-dark-grey">@{userAuth?.username}</p>
        </button>
      </div>
    </AnimationWraper>
  );
}

export default UserNavigation