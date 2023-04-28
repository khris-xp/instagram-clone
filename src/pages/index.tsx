import { Fragment } from 'react';
import Head from 'next/head';
import { Header, Feed, Modal } from '@/components';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Fragment>
      <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
        <Head>
          <title>Instagram Clone</title>
          <link rel='icon' href='/instagram-icon.svg' />
        </Head>
        <Header />
        <Feed />
        <Modal />
      </div>
    </Fragment>
  )
}

export default Home