import { Fragment } from 'react'
import Image from 'next/image'
import { PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <Fragment>
            <div className='flex justify-between max-w-6xl'>
                <div className='relative hidden lg:inline-grid h-24 w-24 mt-3'>
                    <Image src='https://links.papareact.com/ocw' alt='full-logo-image' width={1000} height={1000} />
                </div>

                <div className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer mt-3'>
                    <Image src='https://links.papareact.com/jjm' alt='mini-logo-image' width={1000} height={1000} />
                </div>

                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' type='text' placeholder='Search' />
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Header
