import { Fragment } from 'react'
import { NextComponentType } from 'next'
import { Post } from '@/components'
import { PostConstants } from '@/constants/post'
import { TPost } from '@/interfaces/post'

const Posts: NextComponentType = () => {
    return (
        <Fragment>
            {PostConstants.map((post: TPost) => (
                <Post key={post.id} username={post.username} userImage={post.userImage}
                    postImage={post.postImage} caption={post.caption} />
            ))}
        </Fragment>
    )
}

export default Posts