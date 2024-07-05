import Link from "next/link";
import { getFullDay } from "@/common/date";

export default function AbloutUser({className, bio, social_links, joinedAt} : {className: string, bio: string, social_links: any, joinedAt: any}) {
  return (
    <div className={`md:w-[90%] md:mt-7 ` + className}>

      <p className='text-xl leading-7'>{bio.length ? bio : "Nothing to read here"}</p>

      <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey'>
        {
          Object.keys(social_links).map((key) => {

            let link = social_links[key];

            return link ? <Link 
              href={link} key={key} 
              target="_blank">
                <i className=
                  {"fi " + (key != 'website' ? "fi-brands-" + key : "fi-rr-globe") + " text-2xl hover:text-black"}>
                </i>
              </Link> : ""
          })
        }
      </div>

      <p className="text-xl leading-7 text-dark-grey">Joined on {getFullDay(joinedAt)}</p>
      
    </div>
  )
}
