import { Fragment } from 'react';
import Head from 'next/head';
import { Header, Feed } from '@/components';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Fragment>
      <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
        <Head>
          <title>Instagram Clone</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <Feed />
      </div>
    </Fragment>
  )
}

export default Home