import React, {useContext, useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import firebaseConfig from './firebase.config';
import {userContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
import fab_logo from './facebook.png';
import google_logo from './google.png';
import logo from './ride_chai.png';
import './Login.css';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        email: '',
        name: '',
        password: '',
        error: '',
        success: false
    })

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    // Google Sign in
    const handleSignGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {name: displayName, email, photoURL};
            setLoggedInUser(signedInUser);
            history.replace(from)
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    // facebook Sign in
    const handleSignFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {name: displayName, email, photoURL};
            setLoggedInUser(signedInUser);
            history.replace(from)
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    // const handleSignOut = () => {
    //     firebase.auth().signOut()
    //         .then(res => {
    //             const signedOutUser = {
    //                 loggedInUser: false
    //             }
    //             setLoggedInUser(signedOutUser)
    //         })
    //         .catch(err => { 
    //     });
    // }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    // menual login
    const handleSubmit = (e) => {
        console.log(user.email, user.password)
        history.replace(from)
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from)
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);

            });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from)
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
        }
        e.preventDefault();
    }
    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center w-100 my-5">
                <div className="col-md-4 col-12">
                    {/* <img src={logo} alt="" className="logo"/> */}
                    <div className="login_area mt-5 text-center">
                        <h2>Log In</h2>
                        <form onSubmit={handleSubmit}>
                            <p style={{color:'red'}}>{user.error}</p>
                            {
                                user.success && <p style={{color:'green'}}>User { newUser ? 'Created' : 'LoggedIn'} Successfully</p>
                            }
                            
                            {newUser && <input type="text" className="inputField" name="name" onBlur={handleBlur} placeholder="Your Full Name" required/>}
                            <br/>
                            <input type="text" className="inputField" name="email" onBlur={handleBlur} placeholder="Your Email Address" required/>
                            <br/>
                            <input type="password" className="inputField" name="password" onBlur={handleBlur} placeholder="Enter Password" required/>
                            <br/>
                            <input type="submit" className="logButton manual" value="Sign In"/>

                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newuser" id="newuser" hidden/>
                            <label htmlFor="newuser">Don't have any Account? Register Here</label>
                        </form>
                        <div className="divider d-flex align-items-center justify-content-center mt-2">
                            <div className="border_after"></div>
                            or
                            <div className="border_after"></div>
                        </div>
                        <button onClick={handleSignGoogle} className="logButton google"> <img src={google_logo} alt=""/> Sign in with Google</button>
                        <button onClick={handleSignFacebook} className="logButton facebook"> <img src={fab_logo} alt=""/> Sign in with Facebook</button>
                        {/* {
                            loggedInUser ? 
                            <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button> 
                            : 
                            <button onClick={handleSignGoogle} className="btn btn-primary">Sign in with Google</button>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;