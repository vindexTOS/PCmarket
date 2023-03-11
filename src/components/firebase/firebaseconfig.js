import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCD_aZcy1WvypduXDjFjOZSgAzdVqaQe9I',
  authDomain: 'pcmarket-8f5e8.firebaseapp.com',
  projectId: 'pcmarket-8f5e8',
  storageBucket: 'pcmarket-8f5e8.appspot.com',
  messagingSenderId: '916396218674',
  appId: '1:916396218674:web:e1defecc7522fc06431f2b',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
