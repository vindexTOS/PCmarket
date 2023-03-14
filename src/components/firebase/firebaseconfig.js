import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCowSTR9AOQEUBJUSww3CcON0Z6ffLPF90',
  authDomain: 'marketlisting-f4b50.firebaseapp.com',
  projectId: 'marketlisting-f4b50',
  storageBucket: 'marketlisting-f4b50.appspot.com',
  messagingSenderId: '340258705251',
  appId: '1:340258705251:web:eaa5f66167bb3cb5fbcd56',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
