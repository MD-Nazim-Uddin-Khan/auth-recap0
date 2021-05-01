import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

// firebase.initializeApp(firebaseConfig);

/* uprey error dekhanor jonno eta use kora hoicey */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {

  const [user, setUser] = useState({});

  /* Sign in by google */
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user)
        setUser(user)
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email, credential)
      });
  }

  /* Sign in by Facebook */
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb user', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email, credential);
      });
  }

  /* Sign in by Github */
  const gtProvider = new firebase.auth.GithubAuthProvider();

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gtProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log('Github user', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorMessage, errorCode, email, credential);
      });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign in using Github</button>

      {/* Google */}
      <p>User Email : {user.email}</p>
      {/* <img src={user.photoURL} alt="" /> */}

      {/* Facebook */}
      <p>User Name : {user.displayName}</p>
      <img src={user.photoURL} alt="" />

      {/* Github */}
      {/* <p>User : {user.}</p> */}
    </div>
  );
}

export default App;
