import React from 'react';
import './App.css';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import { useSelector } from 'react-redux';
import { selectSignedIn } from './features/userSlice';
import Blogs from './Components/Blogs';

function App(){

  const isSignedIn = useSelector(selectSignedIn);

    return (
      <div className="app">
        <Navbar />
        { !isSignedIn ? <Homepage /> : <Blogs /> }
      </div>
    );
}

export default App;