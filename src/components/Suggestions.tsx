import { Fragment, useState, useEffect } from 'react'
import { NextComponentType } from 'next';
import Image from 'next/image'
import { faker } from '@faker-js/faker';
import { TSuggestions } from '@/interfaces/suggestion';

const Suggestions: NextComponentType = () => {
    const [suggestions, setSuggestions] = useState<TSuggestions[]>([]);
    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            avatar: faker.image.avatar(),
            company: faker.company.name()
        }))
        setSuggestions(suggestions)
    }, [])
    return (
        <Fragment>
            <div className='mt-4 ml-10'>
                <div className='flex justify-between text-sm mb-5'>
                    <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                    <button className='text-gray-600 font-semibold'>See All</button>
                </div>
            </div>

            {suggestions.map((profile: TSuggestions) => (
                <div key={profile.userId} className='flex items-center justify-between mt-3 ml-10'>
                    <Image src={profile.avatar} alt='suggestions-image' className='w-10 h-10 rounded-full border p-[2px]' height={1000} width={1000} />
                    <div className='flex-1 mx-4'>
                        <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        <h3 className='text-xs text-gray-400'>Works at {profile.company}</h3>
                    </div>
                    <button className='text-blue-400 text-xs font-semibold'>Follow</button>
                </div>
            ))}
        </Fragment>
    )
}

export default Suggestions