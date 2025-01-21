import dotenv from 'dotenv'
dotenv.config()
import { initializeApp } from "firebase/app"
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "socialai-84ffe.firebaseapp.com",
    databaseURL: "https://socialai-84ffe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "socialai-84ffe",
    storageBucket: "socialai-84ffe.firebasestorage.app",
    messagingSenderId: "302294878610",
    appId: "1:302294878610:web:3a6057490e3adcbc6dd94b",
    measurementId: "G-ZS4VPGV6MS"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getDatabase(firebaseApp)
