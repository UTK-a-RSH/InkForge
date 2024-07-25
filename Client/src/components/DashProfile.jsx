import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const filePickerRef = useRef();


    const handleImageFile = (e) => {
        const file = e.target.files[0];
        if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
        }
        
    };

    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    }, [imageFile]);


    const uploadImage = async () => {
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUpload(progress.toFixed(0));
            }, 
            (error) => {
                setImageUploadError('Please upload an image of size less than 2MB ');
                setImageUpload(null);
                setImageFile(null);
                setImageFileUrl(null)

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(({downloadURL}) => {
                    setImageFileUrl(downloadURL);
                });
            
            }
        )

    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center front semi-bold text-3xl text-gray-800'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type='file' accept='image/*' onChange={handleImageFile} ref={filePickerRef} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow  rounded-full' onClick={() => filePickerRef.current.click()}>
                {imageUpload && (
                    <CircularProgressbar value={imageUpload || 0} text={`${imageUpload}%`} strokeWidth={5} 
                     styles={{
                        root: {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        },
                        path: {
                            stroke: `rgb(62, 104, 96 ${imageUpload/100})`,
                        },
                     }}
                     />
                )}
            <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[#818686a1] ${
                imageUpload && imageUpload < 100 && 'opacity-50'}`}/>

            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
           <TextInput type='username' id='username' placeholder='username' defaultValue={currentUser.name}/>
           <TextInput  type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
           <TextInput type='password' id='password' placeholder='password' defaultValue='*******'/>
           <Button type='submit' className='text-white bg-gradient-to-r from-blue-700 to-black hover:bg-gradient-to-l'  outline> Update </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account </span>
            <span className='cursor-pointer'>Sign Out </span>
        </div>
    </div>
  )
}

export default DashProfile