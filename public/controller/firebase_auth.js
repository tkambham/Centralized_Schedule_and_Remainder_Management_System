import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import { app } from "./firebase_core.js";
import { DEV } from "../model/constants.js";
import { homePageView } from "../view/home_page.js";
import { signinPageView } from "../view/signin_page.js";

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
        if (DEV) console.error('signin error', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Signin Error: ' + errorCode + ' ' + errorMessage);
    }
}

export function attachAuthStateChangObserver()
{
    onAuthStateChanged(auth, authStateChangeListner);
}

function authStateChangeListner(user){
    if(user){
        const postAuth = document.getElementsByClassName('myclass-postauth');
        for(let i=0;i<postAuth.length;i++){
            postAuth[i].classList.replace('d-none','d-block');
        }
        homePageView();
    }
    else{
        const postAuth = document.getElementsByClassName('myclass-postauth');
        for(let i=0;i<postAuth.length;i++){
            postAuth[i].classList.replace('d-block','d-none');
        }
        signinPageView();
    }
}

export async function signOutFirbase(e){
    await signOut(auth);
}