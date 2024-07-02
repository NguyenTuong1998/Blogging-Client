'use client'
import { useState, useRef, useEffect } from "react"
import { useContext } from "react"
import { BlogContext } from "@/app/AppClient"

const defaultActiveIndex = 0

export let activeTabLineRef:any; 
export let activeTabRef: any;
const InpageNavigation = ({ defaultHidden, children }: { defaultHidden : any, children: any }) => {
    
    const {pageState} = useContext(BlogContext) as any;

    let routes=[pageState, "trending blogs"]
    
    activeTabLineRef = useRef<HTMLHRElement>(null)

    activeTabRef = useRef(null)

    let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex)

    const changePageState = (btn: any, i: number) => {

        if (!btn) return

        let { offsetWidth, offsetLeft } = btn

        if (activeTabLineRef.current !== null) {
            activeTabLineRef.current.style.width = offsetWidth + 'px'
            activeTabLineRef.current.style.left = offsetLeft + 'px'
        }

        setInPageNavIndex(i)
    }

    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex)
    }, [])

    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {routes.map((route: any, i: number) => {
                    return (
                        <button
                            ref={i == defaultActiveIndex ? activeTabRef : null}
                            key={i}
                            className={`p-4 px-5 capitalize ${inPageNavIndex == i ? 'text-black' : 'text-dark-grey'} ${defaultHidden.includes(route) && "md:hidden"}`}
                            onClick={(e) => { changePageState(e.target, i) }}
                        >
                            {route}
                        </button>
                    );
                })}

                <hr ref={activeTabLineRef} className="absolute bottom-0 border-y-zinc-950 duration-300" />

            </div>
            
            {Array.isArray(children) ? children[inPageNavIndex] : children}
        </>
        
    )
}

export default InpageNavigation