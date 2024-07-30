import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import React from 'react';
import { HiArrowRight, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
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
      <SidebarItemGroup>
        <Link to = '/dashboard?tab=profile'>
        <SidebarItem active = {tab === 'profile'}  icon={HiUser} label="User" labelColor="dark" as='div'>
          Profile
        </SidebarItem>
        </Link>
        <SidebarItem icon={HiArrowRight} className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
  );
}

export default DashSidebar;