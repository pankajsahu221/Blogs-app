import React from 'react'
import GoogleLogin from 'react-google-login';
import './Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../features/userSlice';

function Homepage() {

    const isSignedIn = useSelector(selectSignedIn);

    return (
        <>
        <div className="homepage">
            {!isSignedIn ? <LoginMsg />  : "" }
        </div>
        </>
    )
}

function LoginMsg(){

    const dispatch = useDispatch();

    const login = (response)=>{
        console.log(response);
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    }

    return (
        <>
        <div className="login__msg">
                <h1>A Reader's favourite place!</h1>
                <p>
                  We provide high quality online resources for reading blogs. Just sign up and start reading some quality blogs.
                </p>
                <GoogleLogin 
                   clientId="1025477378168-4vu1qqjkqkqtuassr62pcfvvstps8akt.apps.googleusercontent.com"
                   render={(renderProps) => {
                      return <button 
                         onClick={renderProps.onClick}
                         disabled={renderProps.disabled}
                         className="login__btn"
                        >
                           Login with Google
                       </button>
                   }}
                   onSuccess={login}
                   onFailure={login}
                   isSignedIn={true}
                   cookiePolicy={"single_host_origin"}
                />
            </div>
            </>
    )
}

export default Homepage
