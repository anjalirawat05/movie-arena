// Import Firebase services
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBah9BPfStiWgXZoNDPWUaMfGkgJxdqmgg",
    authDomain: "movie-arena-936a4.firebaseapp.com",
    projectId: "movie-arena-936a4",
    storageBucket: "movie-arena-936a4.firebasestorage.app",
    messagingSenderId: "548970243969",
    appId: "1:548970243969:web:e3dd068da398c0d087aa80"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-up form handling
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

// Login form handling
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

const errorMessage = document.getElementById('error-message');

// Sign-up functionality
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('User created successfully!');
    
       window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessageText = error.message;
      errorMessage.textContent = `Sign Up Error: ${errorMessageText}`;
      console.error('Error:', errorCode, errorMessageText);
    });
});

// Login functionality
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('User logged in successfully!');
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessageText = error.message;
      errorMessage.textContent = `Login Error: ${errorMessageText}`;
      console.error('Error:', errorCode, errorMessageText);
    });
});
