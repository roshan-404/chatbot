import React from 'react'
import firebase from 'firebase/app';
import { auth } from './firebase'

function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    
    return (
      <div className="container">
        <button className="btn" onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    )
  
  }

export default SignIn;