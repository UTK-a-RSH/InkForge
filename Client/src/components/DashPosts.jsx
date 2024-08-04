import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';



function DashPosts() {
    const {currentUser} = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    useEffect(()=> {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json();
                if(res.ok){
                    setUserPosts(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        } ;
        if(currentUser.isAdmin){
            fetchPosts();
        }
    }, [currentUser._id])

    return (

        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700'>
         {currentUser.isAdmin && userPosts.length > 0 ? (
          <>  <Table hoverable className='shadow md-5'>
              <TableHead>
                    <TableHeadCell>Date Updated</TableHeadCell>
                    <TableHeadCell>Post Image</TableHeadCell>
                    <TableHeadCell>Post Title</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Delete</TableHeadCell>
                    <TableHeadCell><span>Edit</span></TableHeadCell>
                </TableHead>
                {userPosts.map((post) => (
                    <TableBody className='divide-y'>
                        <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell>
                                {new Date(post.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Link t={`/post/${post.slug}`}>
                                <img 
                                src={post.image}
                                alt={post.title}
                                className='w-20 h-10 object-cover bg-gray-500'/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link t={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>{post.title}</Link>
                            </TableCell>
                            <TableCell>
                                {post.category}
                            </TableCell>
                            <TableCell>
                                <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                            </TableCell>
                            <TableCell>
                                <Link to={`/update-post/${post._id}`} className='text-teal-500  hover:underline cursor-pointer'>
                                <span>Edit</span>
                                </Link>
                                
                            </TableCell>

                        </TableRow>
                    </TableBody>
                ))}
            </Table> </>
         ) : (<p>You do not have any posts</p>)}
        </div>


    )
      
}

export default DashPosts