import { Fragment } from 'react';
import Image from 'next/image';

interface Props {
    img: string;
    username: string;
}

const Story = ({ img, username }: Props) => {
    return (
        <Fragment>
            <div>
                <Image
                    className='w-14 h-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out'
                    src={img}
                    alt='story-image'
                    width={1000}
                    height={1000}
                />
                <p className='text-xs w-14 truncate text-center'>{username}</p>
            </div>
        </Fragment>
    );
};

export default Story;