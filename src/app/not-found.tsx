import Link from "next/link"
export default function NotFound() {
  return (
    <section className='h-h-cover relative p-10 flex flex-col items-center gap-20 text-center'>
        {/* <img src="" className="select-none border-2 border-grey w-72 aspect-square object-cover rounded" alt="" /> */}
        <h1 className='text-4xl font-gelasio leading-7'> Page Not Found</h1>
        <p className="text-dark-grey text-xl leading-7 -mt-8">The page you are looking for does not exissts <Link href='/' className=" text-black underline">Home page</Link> </p>
        <div className="mt-auto">
            {/* <img src="" className="h-8 object-contain block mx-auto select-none" alt="" /> */}
            <p className="mt-5 text-dark-grey">Read millions of stories around the world</p>
        </div>
    </section>
  )
}