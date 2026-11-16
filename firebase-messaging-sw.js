// এই ফাইলটি অবশ্যই সাইটের রুটে (teacher.html এর পাশে) থাকতে হবে
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCDjI1t2EnJKmvAV3hbz-sjir8YW8IfOQg",
  authDomain: "mmmmg-d02b8.firebaseapp.com",
  projectId: "mmmmg-d02b8",
  storageBucket: "mmmmg-d02b8.firebasestorage.app",
  messagingSenderId: "1001193607775",
  appId: "1:1001193607775:web:c4539574a49cddf59341ea"
});
// ব্যাকগ্রাউন্ডে notification পেলে ব্রাউজার নিজেই দেখায়
firebase.messaging();


