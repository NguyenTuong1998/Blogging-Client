'use client'
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "@/common/session";

export const UserContext = createContext<{}>({})

export default function AppProvider({ children }: { children: React.ReactNode }) {
    
    const [userAuth, setUserAuth] = useState<Object | undefined>()

    useEffect(() => {
        let userInSeccion = lookInSession('user');

        userInSeccion ? setUserAuth(JSON.parse(userInSeccion)) : setUserAuth({ access_token: null })

    }, [])
    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            {children}
        </UserContext.Provider>
    );
}