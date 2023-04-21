import React, { Fragment } from 'react'
import Image from 'next/image'

const Header = () => {
    return (
        <Fragment>
            <div className='flex justify-between max-w-6xl'>
                <div className='relative hidden lg:inline-grid h-24 w-24'>
                    <Image src='https://links.papareact.com/ocw' alt='full-logo-image' width={1000} height={1000} />
                </div>
            </div>

            <div className='relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer'>
                <Image src='https://links.papareact.com/jjm' alt='mini-logo-image' width={1000} height={1000} />
            </div>
        </Fragment>
    )
}

export default Header