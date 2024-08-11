import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, ModalBody, Modal, Button } from 'flowbite-react';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";




function DashUsers() {
    const {currentUser} = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userDelete, setUserDelete] = useState('');
    useEffect(()=> {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`api/user/getusers`)
                const data = await res.json();
                if(res.ok){
                    setUsers(data.users);
                }
                if(data.users.length < 9){
                    setShowMore(false);  
                }
            } catch (error) {
                console.log(error.message);
            }
        } ;
        if(currentUser.isAdmin){
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async() => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUsers((prev) => [...prev, ...data.users]);
                if(data.users.length < 9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteUser = async() => {
        try {
            const res = await fetch(`/api/user/delete/${userDelete}`,{
                method : 'DELETE',
            });
            const data = await res.json();
            if(res.ok){
                setUsers((prev) => prev.filter((user) => user._id !== userDelete ));
                setShowModal(false);
            }
            else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message)
        }
    }
  

    return (

        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 w-full'>
         {currentUser.isAdmin && Array.isArray(users)  && users.length > 0 ? (
          <>  <Table hoverable className='shadow md-5 w-full'>
              <TableHead>
                    <TableHeadCell>Date Created</TableHeadCell>
                    <TableHeadCell>User Image</TableHeadCell>
                    <TableHeadCell>Username</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Admin</TableHeadCell>
                    <TableHeadCell>Delete</TableHeadCell>
                </TableHead>
                {users.map((user) => (
                    <TableBody className='divide-y' key={user._id}>
                        <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                
                                <img 
                                src={user.profilePicture}
                                alt={user.username}
                                className='w-10 h-10 object-cover bg-gray-500 rounded-full'/>
                                
                            </TableCell>
                            <TableCell>
                                {user.username}
                            </TableCell>
                            <TableCell>
                                {user.email}
                            </TableCell>
                            <TableCell>
                                {user.isAdmin ? (<FaCheck className='text-green-500'/>): (<FaTimes className='text-red-500'/>)}
                            </TableCell>
                            <TableCell>
                                <span onClick={() => {
                                    setShowModal(true);
                                    setUserDelete(user._id);
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                            </TableCell>
                            

                        </TableRow>
                    </TableBody>
                ))}
            </Table>
            {showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                        Show More
                </button>
            )} </>
         ) : (<><p>You do not have any users</p></>)}
         <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header/>
            <ModalBody>
                <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
               <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Do you want to delete this user ?</h3>
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

export default DashUsers