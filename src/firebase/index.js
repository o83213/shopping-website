import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOOqIZoFc5OGH9a3X6k-f8AyHXDrzwHnM',
  authDomain: 'shoppingwebsite-22c78.firebaseapp.com',
  projectId: 'shoppingwebsite-22c78',
  storageBucket: 'shoppingwebsite-22c78.appspot.com',
  messagingSenderId: '30377284561',
  appId: '1:30377284561:web:078fb720a968010e9c46f0',
  measurementId: 'G-E04LEKKQS1',
}

initializeApp(firebaseConfig)
export { getStorage, ref, getDownloadURL }
