// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvN9b4Y4zX7w2QJ8mK6lP3nR5sT7uV9wX",
    authDomain: "e-com-ef7f0.firebaseapp.com",
    projectId: "e-com-ef7f0",
    storageBucket: "e-com-ef7f0.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789012345678"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Make db available globally
window.db = db;
