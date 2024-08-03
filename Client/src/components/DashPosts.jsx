import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'



function DashPosts() {
    const {currentUser} = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    useEffect(()=> {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`api/post/getposts?userId=${currentUser._id}`)
                const data = res.json();
                if(res.ok){
                    setUserPosts(data.posts);
                }
            } catch (error) {
                
            }
        } ;
        if(currentUser.isAdmin){
            fetchPosts();
        }
    }, [currentUser._id])

  return (
    <div>DashPosts</div>
  )
}

export default DashPosts