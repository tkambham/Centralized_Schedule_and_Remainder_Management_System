import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";

export function menu2PageView()
{
    if(!currentUser){
        root.innerHTML = '<h1>Protected Page</h1>';
        return;
    }
    root.innerHTML = '<h1>Menu2 Page</h1>';
}