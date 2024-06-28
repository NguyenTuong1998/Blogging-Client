'use client'
import "./globals.css";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "@/common/session";
import { Metadata } from "next";
import { cn } from "@/lib/utils"

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export const UserContext = createContext<{}>({})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [userAuth, setUserAuth] = useState<Object | undefined>()

  useEffect(() => {
    let userInSeccion = lookInSession('user');

    userInSeccion ? setUserAuth(JSON.parse(userInSeccion)) : setUserAuth({ access_token : null})
    
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Blog of me</title>
        <meta name='description' content='Generated by create next app' />
      </head>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}>
        <UserContext.Provider value={{userAuth, setUserAuth}} >
          {children}
        </UserContext.Provider>

      </body>
    </html>
  );
}
