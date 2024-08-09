import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { IoMdThumbsUp } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

function Comment({comment, onLike, onEdit, onDelete}) {
    const {currentUser} = useSelector(state => state.user);
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [editedcomment, setEditedComment] = useState(comment.content);
    useEffect(() => {
        const getUser = async() => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getUser();

    }, [comment])

    const handleEdit = async() => {
        setEdit(true);
        setEditedComment(comment.content);

    };

    const handleSave = async() => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    content : editedcomment
                })
            });
            if(res.ok){
                setEdit(false);
                onEdit(comment, editedcomment);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-3'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username}/>
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1' >
                <span  className='font-bold mr-4 text-xs truncate'>{user ? `@${user.username}` : "random user"}</span>
                <span className='text-gray-500 text-xs'>
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>{
                edit ? (
                    <><Textarea className='mb-2'
                    onChange={(e) => setEditedComment(e.target.value)}
                    value={editedcomment}/>
                    <div className='flex justify-end gap-3 text-xs'>
                        <Button onClick={handleSave} type='button' className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg'>
                            Save
                        </Button>
                        <Button type='button' className='text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-400/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg ' outline  onClick={() => setEdit(false)}>
                            Cancel
                        </Button>
                    </div>   
                    
                    </>
                    
                ) : (
                    <>
                     <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                <button type='button' onClick={()=> onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                <IoMdThumbsUp />
                </button>
                <p className='text-gray-400'>
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (
                            comment.numberOfLikes === 1 ? "like" : "likes"
                        )
                    }
                </p>
                {
                  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                    <button type='button' className='text-gray-400 hover:text-blue-500' onClick={handleEdit}>
                        Edit
                    </button>
                    <button type='button' className='text-gray-400 hover:text-red-500' onClick={() => onDelete(comment._id)}>
                        Delete
                    </button>
                    </>
                  )  
                }
            </div>
                    </>
                )
            }
           
        </div>
    </div>
  )
}

export default Comment