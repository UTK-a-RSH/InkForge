import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {

const [formData, setFormData] = useState({});
const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const res = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData),

    });
    const data = await res.json();
  } catch (error){

  }
};

 return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      <div className='flex-1'>
        
      <Link to="/" className=' font-bold dark:text-white text-4xl'>
        <span className='px-2 py-2 bg-gradient-to-r from-red-700 via-black to-black rounded-xl text-white'>INK</span>Forge
    </Link>
        <p className='text-sm mt-5'>Welcome to InkForge. SignUp here with your Email account.</p>
        
         </div>
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your username'/>
            <TextInput type='text' placeholder='Username' id='username'  onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your email'/>
            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your password'/>
            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
          </div>
          <Button className='text-white bg-gradient-to-r from-red-500 to-black hover:bg-gradient-to-l focus:ring-4 focus:outline-none' type='submit'> Sign Up </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account ?</span>
          <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
        </div>
      </div>


      </div>
    </div>
  )
}

export default SignUp