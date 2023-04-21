import React, { Fragment } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Instagram Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
    </Fragment>
  )
}

export default Home