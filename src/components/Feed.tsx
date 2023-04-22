import { Fragment } from 'react'
import { Stories } from '@/components'
import { NextComponentType } from 'next'

const Feed: NextComponentType = () => {
    return (
        <Fragment>
            <main className='grid grid-cols-1 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
                <section className='col-span-2'>
                    <Stories />
                </section>
                <section></section>
            </main>
        </Fragment>
    )
}

export default Feed