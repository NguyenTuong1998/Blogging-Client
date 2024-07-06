import Image from "next/image"

export default function BlogContent({block} : {block: any}) {

  let {type, data} = block

  if(type == 'paragraph'){
    return <p dangerouslySetInnerHTML={{__html: data.text}}></p>
  }

  if(type == 'header'){
    if(data.level == 3){
      return <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{__html: data.text}}></h3>
    }
    return <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{__html: data.text}}></h2>
  }

  if(type == 'image'){
    return(
      <div>
        <Image src={data.file.url} priority width={300} height={300} alt={data.caption}/>
        {data.caption.length ? <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">{data.caption}</p> : ''}
      </div>
    )
  }

  if(type == 'quote'){
    return <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
      <p className="text-xl leading-10 md:text-2xl ">{data.text}</p>
      {data.caption.length ? <p className="w-full text-purple text-base">{data.caption}</p> : ''}
    </div>
  }

  if(type == 'list'){
    return <ol className={`pl-5 ${data.style == 'ordered' ? ' list-decimal' : ' list-disc'}`}>
      {data.items.map((listItem: any, i: number) => {
        return <li className="my-4" key={i} dangerouslySetInnerHTML={{__html: listItem}}></li>
      })}
    </ol>
  }

  else{
    return <h1>This is a blog content</h1>
  }

}
