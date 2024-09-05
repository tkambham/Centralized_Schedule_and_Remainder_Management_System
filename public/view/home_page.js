import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";

export function homePageView()
{
    if(!currentUser){
        root.innerHTML = '<h1>Protected Page</h1>';
        return;
    }
    root.innerHTML = '<h1>Home Page</h1>';
}