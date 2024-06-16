'use client'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    // <div className="flex">
    //   <div className="w-1/3">
    //     nav-left
    //   </div>
    <>
      {children}
    </>
    // </div>
  );
}
