import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '../ui'

export const Layout: FC<{children: React.ReactNode }> = ({children}) => {
  return (
    <>
    <Head>

    </Head>
    <nav>
      <Navbar/>
    </nav>
    <main style={{padding: "20px 50px"}}>
      {children}
    </main>
    </>
  )
}
