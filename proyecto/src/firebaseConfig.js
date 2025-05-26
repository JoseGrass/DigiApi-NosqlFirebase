import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD6kk-t9fFrPv3bs8Wc87ot9g_bZcWc748",
  authDomain: "pokeapi2-48721.firebaseapp.com",
  projectId: "pokeapi2-48721",
  storageBucket: "pokeapi2-48721.firebasestorage.app",
  messagingSenderId: "987361693159",
  appId: "1:987361693159:web:9fe6cf9854c416b73bc142"

};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!
export { auth, db };