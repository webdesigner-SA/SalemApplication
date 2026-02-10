import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// إعدادات Firebase الخاصة بتطبيقك
export const firebaseConfig = {
  apiKey: "AIzaSyCqNMdwDHyoEQEMCcXG5Smb98EDShJeuvE",
  authDomain: "salem-caae3.firebaseapp.com",
  projectId: "salem-caae3",
  storageBucket: "salem-caae3.appspot.com",
  messagingSenderId: "425550122744",
  appId: "1:425550122744:web:9c007e0f9e4075b027350d",
};

// لا تنشئ التطبيق إلا إذا لم يكن موجودًا
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// خدمات Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);