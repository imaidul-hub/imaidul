importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCDjI1t2EnJKmvAV3hbz-sjir8YW8IfOQg",
  authDomain: "mmmmg-d02b8.firebaseapp.com",
  projectId: "mmmmg-d02b8",
  storageBucket: "mmmmg-d02b8.firebasestorage.app",
  messagingSenderId: "1001193607775",
  appId: "1:1001193607775:web:c4539574a49cddf59341ea"
});

// notification পেলোড থাকলে ব্রাউজার নিজেই নোটিফিকেশন দেখায়
firebase.messaging();

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const d = event.notification.data || {};
  const page = (d.FCM_MSG && d.FCM_MSG.data && d.FCM_MSG.data.page) || (d.data && d.data.page) || d.page || d.url || "index.html";
  const url = new URL(page, self.registration.scope).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (const c of list) { if (c.url === url && "focus" in c) return c.focus(); }
      return clients.openWindow(url);
    })
  );
});
