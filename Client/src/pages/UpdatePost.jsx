import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate,  useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'

function UpdatePost() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
try {
    const fetchPost = async() => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if(!res.ok) {
            console.log(data.message);
            setPublishError(data.message);
            return;
        }
        if(res.ok){
            setPublishError(null);
            setFormData(data.posts[0]);
        }
      }
    fetchPost();
} catch (error) {
    console.log(error.message)
}
  }, [postId]);
  

  
  const handleUploadImage = async() => {
    try {
      if(!file){
        setUploadError("Please select an image");
        return;
      }
      setUploadError(null)
      const storage = getStorage(app);
      const fileName =  new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
      }, 

      (error) => {
        setUploadError('Image upload failed');
        setUploadProgress(null);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadProgress(null);
          setUploadError(null);
          setFormData({...formData, image: downloadURL});
        });
        
      }

      ) }
  
    catch (error) {
      setUploadError('Image upload failed');
      setUploadProgress(null);
      console.log(error)
    }
  }


    const handleSubmit = async(e) => {
      
      e.preventDefault();
      try {
        const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
          method : 'PUT',
          headers : {
            'Content-Type' : 'application/json',
            
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(!res.ok){
          setPublishError(data.message)
          return;
        }
        if(res.ok){
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
        
      } catch (error) {
       
        setPublishError('Something went wrong');
      }
    }
    
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>

        <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>

        <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>


       <div className='flex flex-col gap-4 sm:flex-row justify-between'>

       <TextInput type='text' placeholder='Title' className='flex-1' required id='title' onChange={(e) => setFormData({...formData, title : e.target.value})} value={formData.title}/>

       <Select onChange={(e) => setFormData({...formData, category : e.target.value})} value={formData.category}>

        <option value='uncategorized'>Select a category</option>
        <option value='Algorithms'>Algorithms</option>
        <option value='Data Structures'>Data Structures</option>
        <option value='Web Development'>Web Development</option>
        <option value='Mobile Development'>Mobile Development</option>
        <option value='Machine Learning'>Machine Learning</option>
        <option value='Artificial Intelligence'>Artificial Intelligence</option>
        <option value='Cyber Security'>Cyber Security</option>
        <option value='Cloud Computing'>Cloud Computing</option>
        <option value='DevOps'>DevOps</option>
        <option value='Large Language Model'>Large Language Model</option>

       </Select>
       </div>

        <div className='flex flex-gap-4 items-center justify-between border-4 border-purple-700 border-dotted p-3 w-full'>

        <FileInput type='file' accept='image/*'  onChange={(e) => setFile(e.target.files[0])}/>
        <Button type='button' className='text-white bg-gradient-to-r from-purple-600 to-black hover:bg-gradient-to-l ' outline onClick={handleUploadImage} disabled={uploadProgress !== null}>
        {
          uploadProgress ? (
          <div className='w-16 h-16'>
            <CircularProgressbar value={uploadProgress} text={`${uploadProgress || 0}%`}/>
             </div> )  : (
            'Upload Image'
          )
        }
        </Button>
        

        </div>

        {uploadError && <Alert color='failure'>{uploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
        )}

        <ReactQuill required theme='snow' placeholder='Write your post here...' className='h-96 w-full'  onChange={(value) => {setFormData({...formData, content : value})}} value={formData.content}/>
        <Button type='submit' className=' text-white bg-gradient-to-r from-yellow-400 to-black hover:bg-gradient-to-l w-full' outline>Update Post</Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}

        </form>
    </div>
  )
}

export default UpdatePost