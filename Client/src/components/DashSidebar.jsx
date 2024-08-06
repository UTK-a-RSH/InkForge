import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import React from 'react';
import { HiArrowRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    }, [location.search]);

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
    <Sidebar className='w-full md:w-56'>
      <SidebarItemGroup className='flex flex-col gap-1'>
        <Link to = '/dashboard?tab=profile'>
        <SidebarItem active = {tab === 'profile'}  icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor="dark" as='div'>
          Profile
        </SidebarItem>
        </Link>
       {
        currentUser.isAdmin && (
          <Link to='/dashboard?tab=posts'>
            <SidebarItem
            active={tab==='posts'}
            icon = {HiDocumentText}
            as='div'>
              Posts
           </SidebarItem>                            
          </Link>
        )
       }
       {
        currentUser.isAdmin && (
          <Link to='/dashboard?tab=users'>
            <SidebarItem
            active={tab==='users'}
            icon = {HiOutlineUserGroup}
            as='div'>
              Users
           </SidebarItem>                            
          </Link>
        )
       }
        <SidebarItem icon={HiArrowRight} className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
  );
}

export default DashSidebar;