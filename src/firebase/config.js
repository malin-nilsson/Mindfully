import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

export const firebaseConfig = {
  apiKey: 'AIzaSyADeIUltIddCu4ak2YN9b6KuoXIYLuCfQc',
  authDomain: 'finalproject-mi.firebaseapp.com',
  projectId: 'finalproject-mi',
  storageBucket: 'finalproject-mi.appspot.com',
  messagingSenderId: '362050257066',
  appId: '1:362050257066:web:e450e97cbca0fcbcd7d0d3',
  databaseURL:
    'https://finalproject-mi-default-rtdb.europe-west1.firebasedatabase.app',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const database = getDatabase(app)
