declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      logout(): void
      login(email: string, password: string): void
    }
  }
}

import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const firebaseConfig = {
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
const auth = getAuth()

Cypress.Commands.add('logout', () => {
  return signOut(auth)
})

Cypress.Commands.add('login', (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
})
