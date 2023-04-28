import { Fragment } from 'react';
import Image from 'next/image';
import { PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/20/solid';
import { NextComponentType } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, NextRouter } from 'next/router';
import { Session } from 'next-auth';
import { useRecoilState } from 'recoil';
import modalAtom from '../../atoms/modalAtom';

const Header: NextComponentType = () => {
    const { data: session } = useSession() as { data: Session | null };
    const [open, setOpen] = useRecoilState<boolean>(modalAtom);
    const router: NextRouter = useRouter();

    return (
        <Fragment>
            <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
                <div className='flex justify-between max-w-6xl mx-5 xl:mx-auto py-3'>
                    <div className='hidden lg:relative lg:flex h-10 w-24 cursor-pointer' onClick={() => router.push('/')}>
                        <Image src='https://links.papareact.com/ocw' alt='full-logo-image' width={1000} height={1000} />
                    </div>

                    <div className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer' onClick={() => router.push('/')}>
                        <Image src='https://links.papareact.com/jjm' alt='mini-logo-image' width={1000} height={1000} />
                    </div>

                    <div className='max-w-xs'>
                        <div className='relative rounded-md'>
                            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
                            </div>
                            <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' type='text' placeholder='Search' />
                        </div>
                    </div>

                    <div className='flex items-center justify-end space-x-4'>
                        <HomeIcon className='navBtn' onClick={() => router.push('/')} />
                        <Bars3Icon className='h-6 md:hidden cursor-pointer' />
                        {session ? (
                            <Fragment>
                                <div className='relative navBtn'>
                                    <PaperAirplaneIcon className='navBtn rotate-315' />
                                    <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'>3</div>
                                </div>
                                <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                                <UserGroupIcon className='navBtn' />
                                <HeartIcon className='navBtn' />
                                <Image src={session?.user?.image!} alt='profi-picture'
                                    className='h-10 w-10 rounded-full cursor-pointer' width={1000} height={1000} onClick={() => signOut()} />
                            </Fragment>
                        ) : (
                            <button onClick={() => signIn()}>Signin</button>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header
