import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: 'AIzaSyDVCyjbX7hSP4-zOrH-gWH-aH2MqCTQv4o',
    authDomain: 'portal-silistra-react.firebaseapp.com',
    projectId: 'portal-silistra-react',
    storageBucket: 'portal-silistra-react.appspot.com',
    messagingSenderId: '457581867256',
    appId: '1:457581867256:web:6ae7c24541d6a24ed54b0d',
});

// Firebase storage reference
export const storage = getStorage(app);