import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Pins from './Pins';
import logo from '../assets/logotext_colorshot.png';
import { UserProvider } from '../components/context/UserContext';
import { GUEST_USER } from '../utils/guestUser';
import { getUserFromStorage } from '../utils/auth';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const initializeUser = async () => {
    const userInfo = getUserFromStorage();

    if (userInfo?.googleId) {
      if (userInfo.googleId === 'guest-google-id') {
        // Guest user - no need to fetch from Sanity
        setUser(GUEST_USER);
      } else {
        // Regular Google-authenticated user
        const userQueryStr = userQuery(userInfo.googleId);
        const data = await client.fetch(userQueryStr);
        setUser(data[0]);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);
  // console.log('userHome', user);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} user={user && user} />
        </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <UserProvider value={{ user, setUser }}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
          </Routes>
        </UserProvider>
      </div>
    </div>
  );
};

export default Home;
