import { initializeApp, FirebaseApp, getApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

type TFirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: TFirebaseConfig = {
    apiKey: "AIzaSyCQaNaosH-CZWBpjbAQB0Bi5UtEKTtbdvE",
    authDomain: "instagram-clone-6d2a8.firebaseapp.com",
    projectId: "instagram-clone-6d2a8",
    storageBucket: "instagram-clone-6d2a8.appspot.com",
    messagingSenderId: "461576038354",
    appId: "1:461576038354:web:6600a38088b77aa9e14a0b",
    measurementId: "G-7TDXX46RZH"
};

const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database: Firestore = getFirestore();
const storage = getStorage();

export { app, database, storage }