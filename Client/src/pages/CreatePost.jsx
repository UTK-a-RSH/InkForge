import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>

        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>

        <form className='flex flex-col gap-4 '>


       <div className='flex flex-col gap-4 sm:flex-row justify-between'>

       <TextInput type='text' placeholder='Title' className='flex-1' required id='title'/>

       <Select >

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

        <FileInput type='file' accept='image/*'  />
        <Button type='button' className='text-white bg-gradient-to-r from-purple-600 to-black hover:bg-gradient-to-l ' outline>Upload Image</Button>
        

        </div>

        <ReactQuill required theme='snow' placeholder='Write your post here...' className='h-96 w-full'/>
        <Button type='submit' className=' text-white bg-gradient-to-r from-orange-600 to-black hover:bg-gradient-to-l w-full' outline>Publish Post</Button>


        </form>







    </div>
  )
}

export default CreatePost