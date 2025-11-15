import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuration Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAOfZ9-F9qXFACQjqZ2cWD49FZM5sj4Ic0",
  authDomain: "kl-technology.firebaseapp.com",
  projectId: "kl-technology",
  storageBucket: "kl-technology.firebasestorage.app",
  messagingSenderId: "1097884990051",
  appId: "1:1097884990051:web:cf39e32d57183b4443d656",
  measurementId: "G-ED4Y8ZBGFX"
};

// Initialisation de Firebase
export const app = initializeApp(firebaseConfig);

// Initialisation sécurisée d’Analytics (uniquement côté client)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}
