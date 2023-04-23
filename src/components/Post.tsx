import { Fragment, FunctionComponent } from 'react';
import Image from 'next/image';
import { TPost } from '@/interfaces/post';
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, FaceSmileIcon, EllipsisHorizontalIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/20/solid';

const Post: FunctionComponent<TPost> = ({ username, userImage, postImage, caption }) => {
    return (
        <Fragment>
            <div className='bg-white my-7 border rounded-sm mx-auto'>
                <div className='flex items-center p-5'>
                    <Image src={userImage} className='rounded-full h-12 w-12 object-contain border p-1 mr-3' alt='user-image' width={1000} height={1000} />
                    <p className='flex-1 font-bold'>{username}</p>
                    <EllipsisHorizontalIcon className='h-5' />
                </div>

                <Image src={postImage} className='object-cover w-full' alt='post-image' width={1000} height={1000} />

                <div className='flex justify-between px-4 pt-4'>
                    <div className='flex space-x-4'>
                        <HeartIcon className='btn' />
                        <ChatBubbleOvalLeftEllipsisIcon className='btn' />
                        <PaperAirplaneIcon className='btn' />
                    </div>

                    <BookmarkIcon className='btn' />
                </div>

                <p className='p-5 truncate'>
                    <span className='font-bold mr-1'>{username}</span>
                    {caption}
                </p>

                <form className='flex items-center p-4'>
                    <FaceSmileIcon className='h-7' />
                    <input
                        type='text'
                        placeholder='Add a comment...'
                        className='border-none flex-1 focus:ring-0 outline-none'
                    />
                    <button className='font-semibold text-blue-400
                    '>Post</button>
                </form>

            </div>
        </Fragment>
    )
}

export default Post