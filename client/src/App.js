import React from "react";
import Chatbot from './Chatbot/Chatbot';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth /firebase'
import SignIn from "./auth /Signup";


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '3rem'}}>
       
      {user ? <Chatbot /> : <SignIn/>}
        


      </div>
    </div>
  )
}

export default App
