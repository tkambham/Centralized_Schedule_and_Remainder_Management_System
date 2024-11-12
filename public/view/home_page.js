import { currentUser } from "../controller/firebase_auth.js";
import { onSubmitCalcForm } from "../controller/home_controller.js";
import { DEV } from "../model/constants.js";
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

    let appointmentList;
    try{
        appointmentList = await getAppointmentList(currentUser.email);
    }
    catch(e){
        if(DEV) console.log('Failes to the appointment list', e);
        alert('Failed to load the appointment list', JSON.stringify(e));
        return;
    }

    root.innerHTML='';
    root.appendChild(divWrapper);
}