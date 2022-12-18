import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyADeIUltIddCu4ak2YN9b6KuoXIYLuCfQc',
  authDomain: 'finalproject-mi.firebaseapp.com',
  projectId: 'finalproject-mi',
  storageBucket: 'finalproject-mi.appspot.com',
  messagingSenderId: '362050257066',
  appId: '1:362050257066:web:e450e97cbca0fcbcd7d0d3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
