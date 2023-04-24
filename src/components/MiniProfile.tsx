import React, { Fragment } from 'react'
import Image from 'next/image'
import { NextComponentType } from 'next'

const MiniProfile: NextComponentType = () => {
    return (
        <Fragment>
            <div className='flex items-center justify-between mt-4 ml-10'>
                <Image src='https://i.pravatar.cc/150?img=3' width={1000} height={1000} className='w-16 h-16 rounded-full border p-[2px]' alt='miniprofile-image' />
                <div className='flex-1 mx-4'>
                    <h2 className='font-bold'>John Doe</h2>
                    <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
                </div>
                <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
            </div>
        </Fragment>
    )
}

export default MiniProfile