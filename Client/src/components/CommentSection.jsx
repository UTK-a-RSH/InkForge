import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user);
    const [comment, addComment] = useState('');
    const [commentError, setCommentError] = useState('')

    const handleComment = async(e) => {
        e.preventDefault();
        if(comment.length > 200){
            return;
        }

        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                
                },
                body: JSON.stringify({content : comment, postId, userId: currentUser._id}),
            });
    
            const data = await res.json();
    
            if(res.ok){
                addComment('');
                setCommentError(null);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };
  return (
    <div className='max-w-full mx-auto w-full p-3'>
{
    currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} className='h-5 w-5 object-cover rounded-full'/>
            <Link to={'/dashboard?tab=profile'} className='text-indigo-500 hover:underline'>
            @{currentUser.username}
            </Link>
        </div>
    ) : (
<div className='text-sm text-teal-300 my-5 flex gap-1'>
    You must stay signed in to comment.
    <Link to={'/sign-in'} className='text-blue-500 hover:underline'>
    Sign In
    </Link>
</div>
    )
}
{
    currentUser && (
        <form onSubmit={handleComment} className='border-teal-400 rounded-md p-3'>
            <Textarea
            placeholder='Write a comment'
            rows='3'
            maxLength='200'
            onChange={(e) => addComment(e.target.value)} value={comment}/>
            <div className='flex justify-between items-center mt-5'>
                <p>{200 - comment.length} characters remaining</p>
                <Button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm ' type='submit'>
                    Add Comment
                </Button>
            </div>
           {commentError && 
           ( <Alert color='failure' className='mt-5'>{commentError}</Alert>)}
        </form>
    )
}
    </div>
  )
}

export default CommentSection