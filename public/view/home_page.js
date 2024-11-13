import { currentUser } from "../controller/firebase_auth.js";
import { app } from "../controller/firebase_core.js";
import { onSubmitCalcForm, renderAppointmentList } from "../controller/home_controller.js";
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

    renderAppointmentList(currentUser.email);

    root.innerHTML='';
    root.appendChild(divWrapper);
}

function buildAppointmentCard(appointment){
    const div = document.createElement('div');
    div.classList.add('card', 'm-2', 'p-2', 'd-inline-block');
    div.style.width = '18rem';
    div.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${appointment.appointmentTitle}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${appointment.appointmentDate} ${appointment.appointmentTime}</h6>
            <p class="card-text">${appointment.appointmentNotes}</p>
            <button class="btn btn-outline-primary">Edit</button>
            <button class="btn btn-outline-danger">Delete</button>
        </div>
    `;
    return div;
}