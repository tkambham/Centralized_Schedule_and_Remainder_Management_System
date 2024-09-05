import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";

export async function homePageView()
{
    if(!currentUser){
        root.innerHTML = await protectedView();
        return;
    }
    
    const response = await fetch('/view/templates/home_page_template.html',
        {cache: "no-store"});
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4','p-4');

    root.innerHTML='';
    root.appendChild(divWrapper);
}