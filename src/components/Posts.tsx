import { Fragment, useState, useEffect } from 'react'
import { NextComponentType } from 'next'
import { Post } from '@/components'
import { PostConstants } from '@/constants/post'
import { TPost } from '@/interfaces/post'
import { collection, onSnapshot, query } from '@firebase/firestore';
import { database } from '@/firebase';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, orderBy } from 'firebase/firestore'

const Posts: NextComponentType = () => {

    const [posts, setPosts] = useState<TPost[]>([]);

    useEffect(() => {
        onSnapshot(query(collection(database, 'posts'), orderBy('timestamp', 'desc')), (snapshot: QuerySnapshot<DocumentData>) => {
            setPosts(snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                username: doc.data().username,
                userImage: doc.data().profileImg,
                postImage: doc.data().image,
                caption: doc.data().caption,
            } as TPost)))
        })
    }, [])
    return (
        <Fragment>
            {posts.map((post: TPost) => (
                <Post key={post.id} username={post.username} userImage={post.userImage}
                    postImage={post.postImage} caption={post.caption} />
            ))}
        </Fragment>
    )
}

export default Posts