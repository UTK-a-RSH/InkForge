import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-violet-600 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
    
        
<div className=' flex-1 justify-center flex flex-col'>
   
   <h2 className='text-cyan-500 justify-center m-4 font-semibold text-1xl'>
        Connect with us to learn and grow more.
    </h2>
    <Button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-400 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 w-full' outline>
        Checkout more
    </Button>
    
        </div>
        <div className='p-7 flex-1'>
            <img src='https://www.simplilearn.com/ice9/free_resources_article_thumb/full_stack_banner.jpg'/>
        </div>
        
        </div>
  )
}

export default CallToAction