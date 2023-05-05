import { Fragment, useState, useRef } from 'react'
import { NextComponentType } from 'next'
import Image, { StaticImageData } from 'next/image';
import { useRecoilState } from 'recoil';
import modalAtom from '../../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/20/solid';
import { database, storage } from '@/firebase';
import { DocumentData, DocumentReference, addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';

const Modal: NextComponentType = () => {
    const [open, setOpen] = useRecoilState<boolean>(modalAtom);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const captionRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | StaticImageData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session } = useSession() as { data: Session | null };

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        if (e.target.files![0]) {
            reader.readAsDataURL(e.target.files![0]);
        }
        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
            setFileUrl(readerEvent.target!.result as unknown as string);
            setSelectedFile(readerEvent.target!.result as unknown as File);
        }
    }

    const uploadPost = async (): Promise<void> => {
        if (loading) return;
        setLoading(true);

        const docRef: DocumentReference<DocumentData> = await addDoc(collection(database, 'posts'), {
            username: session?.user?.name,
            caption: captionRef.current?.value,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp()
        });

        console.log("New Doc added with Id: ", docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile!.toString(), 'data_url').then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(database, 'posts', docRef.id), {
                image: downloadUrl
            })
        });

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

    return (
        <Fragment>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
                    <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                        </Transition.Child>
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true' />
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                                <div>
                                    {selectedFile ? (
                                        <Image
                                            src={fileUrl as string | StaticImageData}
                                            onClick={() => setSelectedFile(null)}
                                            alt="upload-image"
                                            width={1000}
                                            height={1000} />
                                    ) : (
                                        <div onClick={() => filePickerRef.current?.click()} className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
                                            <CameraIcon
                                                className='h-6 w-6 text-red-600'
                                                aria-hidden='true'
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <div className='mt-3 text-center sm:mt-5'>
                                            <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                                                Upload a Post
                                            </Dialog.Title>
                                        </div>
                                        <div>
                                            <input
                                                className='border-none focus:ring-0 w-full text-center'
                                                ref={filePickerRef}
                                                type='file'
                                                hidden
                                                onChange={addImageToPost}
                                            />
                                        </div>

                                        <div className='mt-2'>
                                            <input
                                                className='border-none focus:ring-0 w-full text-center'
                                                type='text'
                                                ref={captionRef}
                                                placeholder='Please enter a caption ...'
                                            />
                                        </div>
                                    </div>

                                    <div className='mt-5 sm:mt-6'>
                                        <button
                                            onClick={uploadPost}
                                            className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                                            focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'>
                                            Upload Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root >
        </Fragment >
    )
}

export default Modal