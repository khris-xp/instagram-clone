import { ChangeEvent, Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import { TPost } from '@/interfaces/post';
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, FaceSmileIcon, EllipsisHorizontalIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { database } from '@/firebase';
import Moment from 'react-moment';

interface PropsSession {
    expires: string;
    data: {
        user: {
            image: string;
            uuid: string;
            name: string;
            email: string
        }
    };
}

const Post = ({ id, username, userImage, postImage, caption }: TPost) => {
    const { data: session } = useSession() as unknown as PropsSession;
    const [inputComment, setInputComment] = useState<string>('');
    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    console.log(session)

    useEffect(() =>
        onSnapshot(
            query(
                collection(database, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            (snapshot) => setComments(snapshot.docs)
        ),
        [id]
    );

    useEffect(() =>
        onSnapshot(
            collection(database, 'posts', id, 'likes'),
            (snapshot) => setLikes(snapshot.docs)
        ),
        [id]
    );

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uuid) !== -1);
    }, [likes, session?.user?.uuid])

    const likePost = async (): Promise<void> => {
        if (hasLiked) {
            await deleteDoc(doc(database, 'posts', id, 'likes', session?.user?.uuid!));
        } else {
            await setDoc(doc(database, 'posts', id, 'likes', session?.user?.uuid!), {
                username: session?.user?.name,
            });
        }
    }

    const sendComment = async (): Promise<void> => {
        const commentToSend = inputComment;
        setInputComment('');
        if (!commentToSend) return;
        await addDoc(collection(database, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user?.name,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        });
    }

    return (
        <Fragment>
            <div className='bg-white my-7 border rounded-sm mx-auto'>
                <div className='flex items-center p-5'>
                    <Image src={userImage} className='rounded-full h-12 w-12 object-contain border p-1 mr-3' alt='user-image' width={1000} height={1000} />
                    <p className='flex-1 font-bold'>{username}</p>
                    <EllipsisHorizontalIcon className='h-5' />
                </div>
                <Image src={postImage} className='object-cover w-full' alt='post-image' width={1000} height={1000} />
                {session && (
                    <div className='flex justify-between px-4 pt-4'>
                        <div className='flex space-x-4'>
                            {
                                hasLiked ? (
                                    <HeartIconFilled onClick={likePost} className='btn text-red-500' />
                                ) : (
                                    <HeartIcon onClick={likePost} className='btn' />
                                )
                            }
                            <ChatBubbleOvalLeftEllipsisIcon className='btn' />
                            <PaperAirplaneIcon className='btn' />
                        </div>
                        <BookmarkIcon className='btn' />
                    </div>
                )}
                <p className='p-5 truncate'>
                    {likes.length > 0 && (
                        <p className='font-bold mr-1'>{likes.length} likes</p>
                    )}
                    <span className='font-bold mr-1'>{username}</span>
                    {caption}
                </p>

                {comments.length > 0 && (
                    <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                        {comments.map((comment: QueryDocumentSnapshot<DocumentData>, index: number) => (
                            <div key={index} className='flex items-center space-x-2 mb-3'>
                                <Image src={comment?.data().userImage} alt='comment-image' className='h-7 rounded-full' height={20} width={30} />
                                <p className='text-sm flex-1'>
                                    <span className='font-bold mr-1'>{comment.data().username}</span>
                                    {comment?.data().comment}
                                </p>
                                <Moment fromNow className='pr-5 text-xs'>
                                    {comment?.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        ))}
                    </div>
                )}

                <form className='flex items-center p-4'>
                    <FaceSmileIcon className='h-7' />
                    <input
                        type='text'
                        placeholder='Add a comment...'
                        className='border-none flex-1 focus:ring-0 outline-none'
                        value={inputComment}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputComment(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='font-semibold text-blue-400'
                        disabled={!inputComment.trim()}
                        onClick={() => sendComment()}
                    >Post</button>
                </form>

            </div>
        </Fragment>
    )
}

export default Post