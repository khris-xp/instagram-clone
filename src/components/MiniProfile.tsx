import React, { Fragment } from 'react';
import Image from 'next/image';
import { NextComponentType } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const MiniProfile: NextComponentType = () => {
    const { data: session } = useSession() as { data: Session | null };
    console.log(session?.user?.image)
    return (
        <Fragment>
            <div className='flex items-center justify-between mt-4 ml-10'>
                <Image src='https://cdn-icons-png.flaticon.com/512/3607/3607444.png' width={1000} height={1000} className='w-16 h-16 rounded-full border p-[2px]' alt='miniprofile-image' />
                <div className='flex-1 mx-4'>
                    <h2 className='font-bold'>{session?.user?.name}</h2>
                    <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
                </div>
                <button onClick={() => signOut()} className='text-blue-400 text-sm font-semibold'>Sign Out</button>
            </div>
        </Fragment>
    )
}

export default MiniProfile