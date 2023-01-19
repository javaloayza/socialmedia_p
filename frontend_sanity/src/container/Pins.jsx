import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';
import Home from './Home';

const Pins = ({ pins, user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Feed />} />
              {/* Otras rutas protegidas */}
            </>
          ) : (
            <>
              <Route path="/Home" element={<Feed />} /> {/* Ruta principal para usuarios NO logueados */}
            </>
          )}
          <Route path="/category/:categoryId" element={<Feed pins={pins} />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user && user} />} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
