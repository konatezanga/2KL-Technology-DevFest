// firebase/init.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

// Pour éviter de réinitialiser l'app à chaque reload dans Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Auth instance
const auth = getAuth(app);

export { auth };
