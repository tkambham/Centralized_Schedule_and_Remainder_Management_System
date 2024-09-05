import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import { app } from "./firebase.js";

const auth = getAuth(app);

export async function signinFirebase(e)
{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}