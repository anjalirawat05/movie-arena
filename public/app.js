
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyBah9BPfStiWgXZoNDPWUaMfGkgJxdqmgg",
    authDomain: "movie-arena-936a4.firebaseapp.com",
    projectId: "movie-arena-936a4",
    storageBucket: "movie-arena-936a4.firebasestorage.app",
    messagingSenderId: "548970243969",
    appId: "1:548970243969:web:e3dd068da398c0d087aa80"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

const errorMessage = document.getElementById('error-message');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    
      const user = userCredential.user;
      alert('User created successfully!');
    //  return user.getIdToken();
 // })
 /* .then((idToken) => {
   
      fetch('http://localhost:3001/protected', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${idToken}`,
          }, 
       
      }) */

    /*  .then(response => response.json())
      .then(data => {
          console.log(data);*/

          window.location.href = "index.html"; 
      })
      //.catch(error => console.error('Error:', error));
  //})
  .catch((error) => {
    const errorcode=error.code;
    const errorMessage=error.message;
      alert('Error: ' + error.message);
  });
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User logged in successfully!');
      /*return user.getIdToken();
  })
  .then((idToken) => {
    console.log("this is the token",idToken);
      fetch('http://localhost:3001/protected', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${idToken}`,
          },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from backend');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data from backend:', data);
      })*/
        window.location.href = "index.html";
  })
  .catch((error) => {
      alert('Error: ' + error.message);
  });
});
