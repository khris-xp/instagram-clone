import { Fragment } from 'react';
import { NextComponentType } from 'next';
import { Stories, Posts, MiniProfile, Suggestions } from '@/components';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

const Feed: NextComponentType = () => {
    const { data: session } = useSession() as { data: Session | null };
    return (
        <Fragment>
            <main className={`grid grid-cols-1 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
                <section className='col-span-2'>
                    <Stories />
                    <Posts />
                </section>
                {session && (
                    <section className='hidden xl:inline-grid md:col-span-1'>
                        <div>
                            <MiniProfile />
                            <Suggestions />
                        </div>
                    </section>
                )}
            </main>
        </Fragment>
    )
}

export default Feed