import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import vesthublogo from './vesthublogo.png';
import HomePage from './Pages/HomePage';
import SigninPage from './Pages/SigninPage';
import NotFoundPage from './Pages/NotFoundPage';
import RegisterPage from './Pages/RegisterPage';
import { useEffect, useState } from 'react';
import SearchPage from './Pages/SearchPage';
import Cookies from 'js-cookie';
import Avatar from 'antd/es/avatar/avatar';
import { Dropdown, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CreateListingPage from './Pages/CreateListingPage';
import FavoritesPage from './Pages/FavoritesPage';
import { HeartOutlined } from '@ant-design/icons';
import MyListingsPage from './Pages/MyListingsPage';
import ProfilePage from './Pages/ProfilePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MeetingsPage from './Pages/MeetingsPage';
import EditListingPage from './Pages/EditListingPage';
import AdminPanel from './Pages/AdminPanel';
import { getProfilePicture } from './Pages/SigninPage';


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="flex flex-row justify-start items-center" onClick={() => window.location.href = '/profile'}>
        <UserOutlined className="text-gray-900 text-[20px]"/>
        <button className="p-2 lg:px-4 md:mx-2 text-gray-900 text-[15px] rounded">Profile<span className="block max-w-0 transition-all duration-500 h-0.5 bg-gray-600"></span></button>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex flex-row justify-start items-center" onClick={() => window.location.href = '/meetings'}>
        <ClockCircleOutlined className="text-gray-900 text-[20px]"/>
        <button className="p-2 lg:px-4 md:mx-2 text-gray-900 text-[15px] rounded">Meetings<span className="block max-w-0 transition-all duration-500 h-0.5 bg-gray-600"></span></button>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className="flex flex-row justify-start items-center" onClick={() => {window.location.href = '/myListings'}}>
        <HomeOutlined className="text-gray-900 text-[20px]"/>
        <button className="p-2 lg:px-4 md:mx-2 text-gray-900 text-[15px] rounded">My Listings<span className="block max-w-0 transition-all duration-500 h-0.5 bg-gray-600"></span></button>
      </div>
    ),
  },
  {
    key: '4',
    label: (
      <div className="flex flex-row justify-start items-center" onClick={() => window.location.href = '/favorites'}>
        <HeartOutlined className="text-gray-900 text-[20px]"/>
        <button className="p-2 lg:px-4 md:mx-2 text-gray-900 text-[15px] rounded">Favorites<span className="block max-w-0 transition-all duration-500 h-0.5 bg-gray-600"></span></button>
      </div>
    ),
  },
  {
    key: '5',
    label: (
      <div className="flex flex-row justify-start items-center" onClick={() => logout()}>
        <LogoutOutlined className="text-[20px]"/>
        <button className="p-2 lg:px-4 md:mx-2 hover:text-white text-[15px] rounded">Sign Out<span className="block max-w-0 transition-all duration-500 h-0.5 bg-gray-600"></span></button>
      </div>
    ),
    danger: true,
  },
  Cookies.get("Email")==="admin@vesthub.com" ?
  {
    key: '6',
    label: (
      <div className="flex flex-row justify-start items-center" onClick={() => window.location.href = '/adminPanel'}>
        <UserOutlined className="text-gray-900 text-[20px]"/>
        <button className="p-2 lg:px-4 md:mx-2 text-gray-900 text-[15px] rounded">Admin Panel<span className="block max-w-0 transition-all duration-500 h-0.5 bg-gray-600"></span></button>
      </div>
    ),
  } : null
];

function App() {
    // Using useState to manage collapse state
    const [isCollapsed, setIsCollapsed] = useState(true);
    Cookies.get("loggedIn") ? console.log("Cookie found") : Cookies.set("loggedIn", "false", { expires: 1 });
    //Cookies.get("latitude") ? Cookies.remove("latitude") : console.log("No latitude cookie found");
    //Cookies.get("longitude") ? Cookies.remove("longitude") : console.log("No longitude cookie found");

    const name=Cookies.get("Name");
    const surname=Cookies.get("Surname");
    const email=Cookies.get("Email");
    const loggedIn=Cookies.get("loggedIn");
    
    
    if (loggedIn==="true"){
      console.log("Logged in as "+name+" "+surname+" with email "+email);
    }
    

    //Cookies.remove("Name");
    useEffect(() => {
      // Using useEffect to toggle collapse class when isCollapsed changes
      const toggleBtn = document.getElementById("navbar-toggle");
      const collapse = document.getElementById("navbar-collapse");
  
      if (toggleBtn && collapse) {
        if (window.location.href.includes('about')) {
          window.history.replaceState(null, '', '/');
        }
        toggleBtn.onclick = () => {
          setIsCollapsed(!isCollapsed); // Toggling isCollapsed state
        };
      }
    }, [isCollapsed]); // Listening for changes in isCollapsed state

    //pathname contains
    if (window.location.href.includes('about')) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }
      , 100);
    }
      
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-backColor w-screen h-screen">
        <header>
          <nav className="px-8 py-2.5">
            <div className="md:flex md:items-center justify-end">
              <div className="flex justify-between items-center">
                <img src={vesthublogo} alt="Logo" width='100' height='100' className="d-inline-block align-center md:mr-6 xs:mr-4 cursor-pointer" onClick={() => window.location.href = '/'} />
                <label className="text-3xl font-bold">VestHub</label>
                <div className='flex items-center'>
                  
                  <button className="bg-button-secondary p-2 rounded md:hidden" id="navbar-toggle">
                    <svg className="h-8 w-8 text-backColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="18" x2="23" y2="18" /><line x1="1" y1="12" x2="23" y2="12" /><line x1="1" y1="6" x2="23" y2="6" /></svg>
                  </button>
                </div>
              </div>
              <div className={`md:flex flex-col md:flex-row md:ml-auto ${isCollapsed ? 'mt-0' : 'mt-3'} md:mt-0 ${isCollapsed ? 'hidden' : 'flex'}`} id="navbar-collapse">
                <button className="group p-2 lg:px-4 md:mx-2 text-gray-900 rounded hover:text-gray-900 transition-colors duration-300" onClick={() => window.location.href = '/'}>Home<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-900"></span></button>
                <button className="group p-2 lg:px-4 md:mx-2 text-gray-900 rounded hover:text-gray-900 transition-colors duration-300" onClick={() => {
                  if (window.location.pathname === '/') {
                    window.scrollTo(0, document.body.scrollHeight);
                    window.location.href = '/#about';
                  }else{
                    window.location.href = '/#about';
                    window.scrollTo(0, document.body.scrollHeight);
                  }
                }}>About<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-900"></span></button>
                
                {loggedIn==="false" &&
                  <div className={`md:flex flex-col md:flex-row md:ml-auto md:mt-0 ${isCollapsed ? 'hidden' : 'flex'}`} id="navbar-collapse">
                    <button className="group p-2 lg:px-4 md:mx-2 text-gray-900 rounded hover:text-gray-900 transition-colors duration-300" onClick={() => window.location.href = '/login'}>Sign In<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-600"></span></button>
                    <button className="group p-2 lg:px-4 md:mx-2 text-white rounded bg-button-secondary hover:bg-button-secondaryHover transition-colors duration-300 shadow-sm" onClick={() => window.location.href = '/register'}>Sign Up</button>
                  </div>
                }
                {loggedIn==="true" &&
                    <div className={`md:flex flex-col md:flex-row md:ml-auto md:mt-0 items-center ${isCollapsed ? 'hidden' : 'flex'}`}>
                      <Dropdown menu={{ items }} className="flex items-center" placement='bottomRight' arrow>
                        <Avatar className="mx-2 cursor-pointer" size={40}>{
                          getProfilePicture ? getProfilePicture() : 
                        (name?.charAt(0).toUpperCase())}</Avatar>
                      </Dropdown>
                    </div>
                }
              </div>
              
            </div>
          </nav>
        </header>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/meetings' element={<MeetingsPage/>} />
            <Route path='/favorites' element={<FavoritesPage/>} />
            <Route path='/login' element={<SigninPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/addHome' element={<CreateListingPage />} />
            <Route path='/myListings' element={<MyListingsPage/>} />
            <Route path='/editListing/:id' element={<EditListingPage />} />
            <Route path='/adminPanel' element={<AdminPanel />} />
            <Route path='/search/*' element={<SearchPage/>} />
            <Route path='/home/*' element={<HomePage home={true}/>} />
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
        </BrowserRouter>
        
        <footer className="bg-button-primary text-center text-white p-4">
          <label>&copy; 2024 VestHub. Group 16. All rights reserved.</label>
        </footer>
      </div>
    </LocalizationProvider>
  );
}

function logout(){
  Cookies.remove("Name");
  Cookies.remove("Surname");
  Cookies.remove("Email");
  Cookies.set("loggedIn", "false", { expires: 1 });
  Cookies.remove("Phone");
  Cookies.remove("fullAddress");
  Cookies.remove("City");
  Cookies.remove("Country");
  Cookies.remove("Password");
  window.location.href = '/';
}

export default App;
