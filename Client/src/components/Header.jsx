import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import { FaSun } from "react-icons/fa6";
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/theme.Slice'
import { signOutSuccess } from '../redux/user/userSlice'

function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const {theme} = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user);
  const [searchItem , setSearchItem] = useState('');


  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search);
    const searchItemFromUrl = urlParams.get('searchItem');
    if(searchItemFromUrl){
      setSearchItem(searchItemFromUrl)
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

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm', searchItem);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
};

  return (
    <Navbar className='border-b-2'><Link to="/" className='self-center whitespace-nowrap text-sm:text-x1 font-semibold dark:text-white'>
        <span className=' w-full px-2 py-2 bg-gradient-to-r from-red-700 via-black to-black rounded-xl text-white'>INK</span>Forge
    </Link><form onSubmit={handleSubmit}>
        <TextInput
        value={searchItem}
        type='text'
        placeholder='Search...'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
        onChange={(e) => setSearchItem(e.target.value)}/>
        </form>
        <Button className='w-12 h-10 lg:hidden' color='green' pill >
          <AiOutlineSearch/>
          </Button>
          
          <div className='flex gap-20 md:order-2'>
            <Button 
            className='w-12 h-10 hidden sm:inline gap-10'
            color = 'gray'
            pill
            onClick = {() => dispatch(toggleTheme())}>
              
           {theme === 'light'  ? <FaSun /> : <FaMoon />}
          
            
            </Button>
            {currentUser ? (
              <Dropdown arrowIcon={false} inline label={
                <Avatar alt='user'
                img = { currentUser.profilePicture}
                 rounded/>
                
              }>
               <DropdownHeader>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
               </DropdownHeader>
               <Link to='/dashboard?tab=profile'>
               <DropdownItem>
                Profile
               </DropdownItem>
               </Link>
               <DropdownDivider/>
               <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
              </Dropdown>
            ) : (
              <Link to='/sign-in'>
              <Button className='w-15 h-10 hidden  sm:inline bg-gradient-to-r from-red-500 via black to-black text-white' color='red' pill outline>Sign In</Button>
              </Link>
            )} 
            <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
              <NavbarLink active = {path === '/'} as={'div'}>
                <Link to='/'>
                Home
                </Link>
              </NavbarLink>
              <NavbarLink active = {path === '/about'} as={'div'}>
                <Link to='/about'>
                About
                </Link>
              </NavbarLink>
              <NavbarLink active = {path === '/projects'} as={'div'}>
                <Link to='/projects'>
                Projects
                </Link>
              </NavbarLink>
            </Navbar.Collapse>
          
          </Navbar>
  )
}

export default Header