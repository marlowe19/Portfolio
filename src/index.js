import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import './bootstrap.min.css';
import * as firebase from 'firebase';
window.addEventListener("keypress", keystroke);


firebase.initializeApp({ apiKey: "AIzaSyBPWHwMJnhnoD4xlCUgRwFeYB50vs8uo8Q",
    authDomain: "marloweportfolio.firebaseapp.com",
    databaseURL: "https://marloweportfolio.firebaseio.com",
    projectId: "marloweportfolio",
    storageBucket: "marloweportfolio.appspot.com",
    messagingSenderId: "213985762349"
   });

   
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.user = user;
    } else {
      window.user = null;
    }
  });
   function keystroke(e){
   
  }

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);