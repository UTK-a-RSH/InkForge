import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutSuccess } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from 'react-redux';

function DashProfile() {
    const {currentUser, error} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [userUpdated, setUserUpdated] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const filePickerRef = useRef();


    const handleImageFile = (e) => {
        const file = e.target.files[0];
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
    
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                // If the file size exceeds the limit, set an error message
                setImageUploadError('Please upload an image of size less than 2MB');
            } else {
                // If the file size is within the limit, proceed with setting the file and URL
                setImageFile(file);
                setImageFileUrl(URL.createObjectURL(file));
                setImageUploadError(null); // Clear any previous error messages
            }
        }
    };

    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    }, [imageFile]);


    const uploadImage = async () => {
        setImageFileUploading(true);
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
                setImageFileUrl(null);
                setImageFileUploading(false);

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({...formData, profilePicture : downloadURL});
                    setImageFileUploading(false);
                });
            
            }
        )

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value });
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        setUpdateError(null);
        setUserUpdated(null);
        if(Object.keys(formData).length === 0){
            setUpdateError('No changes were made');
            return;
        }
        if(imageFileUploading){
            setUpdateError("Please wait for image to upload");
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(formData),
            }) ;          
            const data = await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateError(data.message);
            }
            else{
                dispatch(updateSuccess(data));
                setUserUpdated("User profile is updated successfully");
            }

        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateError(error.message);
        }
    };

    const handleDeleteUser = async() => {
        setShowModal(false);
        try {
            dispatch(deleteUserFailure());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserFailure(data.message));
            }
            else{
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };


        const handleSignOut = async() => {
            try {
                const res = await fetch(`/api/user/signout`, {
                    method : 'POST',
                });
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message);
                }
                else{
                    dispatch(signOutSuccess());
                }
            } catch (error) {
                console.log(error.message)
            }
        };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center front semi-bold text-3xl text-gray-800'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
           <TextInput type='username' id='username' placeholder='username' defaultValue={currentUser.username}  onChange={handleChange}/>
           <TextInput  type='email' id='email' placeholder='email' defaultValue={currentUser.email}  onChange={handleChange}/>
           <TextInput type='password' id='password' placeholder='password' defaultValue='*******'  onChange={handleChange}/>
           <Button type='submit' className='text-white bg-gradient-to-r from-blue-700 to-black hover:bg-gradient-to-l'  outline> Update </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account </span>
            <span className='cursor-pointer' onClick={handleSignOut}>Sign Out </span>
        </div>
        {userUpdated && (
            <Alert color='success' className='mt-5'>
                {userUpdated}
            </Alert>
        )}

        {updateError && (
            <Alert color='failure' className='mt-5'>
                {updateError}
            </Alert>
        )}

        {error && (
            <Alert color='failure' className='mt-5'>
                {error}
            </Alert>
        )}

        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header/>
            <ModalBody>
                <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
               <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Do you want to delete this account</h3>
               <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
                    Yes, Delete it
                </Button>

                <Button color='gray' onClick={() => setShowModal(false)}>
                    No, Don't Delete
                </Button>

               </div>
               
                </div>
            </ModalBody>

        </Modal>

    </div>
  )
}

export default DashProfile