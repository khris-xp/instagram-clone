import { Fragment } from 'react';
import { NextComponentType } from 'next';
import { Stories, Posts, MiniProfile, Suggestions } from '@/components';

const Feed: NextComponentType = () => {
    return (
        <Fragment>
            <main className='grid grid-cols-1 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
                <section className='col-span-2'>
                    <Stories />
                    <Posts />
                </section>
                <section className='hidden xl:inline-grid md:col-span-1'>
                    <div>
                        <MiniProfile />
                        <Suggestions />
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Feed