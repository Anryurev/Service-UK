import React from 'react';
import {Navbar} from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import {Calendar} from "./pages/Calendar";
import {Objects} from "./pages/Objects";

function App() {
  return (
      <>
        <Navbar/>
          <div style={{ paddingTop: '56px' }}>
              <Routes>
                  <Route path="/" element={ <Calendar /> } />
                  <Route path="/objects" element={ <Objects /> } />
              </Routes>
          </div>
      </>
  );
}

export default App;

// e7ecef почти белый
// 274c77 темно-синий
// 6096ba синий
// a3cef1 голубой
// 8b8c89 серый
