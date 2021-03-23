import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSignedIn, selectUserData, setUserData, setSignedIn, setInput } from '../features/userSlice';
import { GoogleLogout } from 'react-google-login';
import { Avatar } from '@material-ui/core';
import './Navbar.css'

function Navbar() {

    const [inpVal, setInpVal] = useState("India");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch()

    const logout = (response)=>{
        dispatch(setSignedIn(false));
        dispatch(setUserData(null)); 
    }

    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(setInput(inpVal));
    }


    return (
        <div className="navbar">
            <h3 className="navbar__header">BlogMania</h3>

            {isSignedIn && 
                <div className="blog__search">
                   <input className="blog__search__input" placeholder="Search for a blog" value={inpVal} onChange={ (e) => { setInpVal(e.target.value) } }/>
                   <button className="blog__search__submit" onClick={ handleClick }>Search</button>
                </div>  }

            {isSignedIn ? 
              <div className="navbar__user__data">
                 <Avatar src={ userData?.imageUrl } alt={userData?.name}/>
                 <h4 className="signedIn">{ userData?.givenName }</h4>
                 <GoogleLogout 
                     clientId="1025477378168-4vu1qqjkqkqtuassr62pcfvvstps8akt.apps.googleusercontent.com"
                     render={(renderProps) => {
                      return <button 
                         onClick={renderProps.onClick}
                         disabled={renderProps.disabled}
                         className="logout__btn"
                        >
                           Logout
                       </button>
                   }}
                   onLogoutSuccess={logout}
                 />
              </div> : <h4 className="notSignedIn">User not available</h4> }
        </div>
    )
}

export default Navbar
