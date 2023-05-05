import { Fragment, useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import { IStories } from '@/interfaces/user';
import { Story } from '@/components';
import { NextComponentType } from 'next';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

const Stories: NextComponentType = () => {
    const [suggestions, setSuggestions] = useState<IStories[]>([]);
    const { data: session } = useSession() as { data: Session | null };
    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
        }));
        setSuggestions(suggestions);
    }, []);
    return (
        <Fragment>
            <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm scrollbar-container' style={{ overflowX: 'scroll' }}>
                {session && (<Story img='https://cdn-icons-png.flaticon.com/512/3607/3607444.png' username={session.user?.name!} />)}
                {suggestions.map((profile: IStories) => (
                    <Story key={profile.userId} img={profile.avatar} username={profile.username} />
                ))}
            </div>
        </Fragment>
    )
}

export default Stories