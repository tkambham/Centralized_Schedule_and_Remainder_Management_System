import { currentUser } from "../controller/firebase_auth.js";
import { onClickDeleteAppointment, onClickEditAppointment, onClickFilterAppointments, onClickGetTypeAppointments, renderAppointmentList } from "../controller/home_controller.js";
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

    divWrapper.querySelector('#all').onclick = onClickFilterAppointments;
    divWrapper.querySelector('#today').onclick = onClickFilterAppointments;
    divWrapper.querySelector('#tomorrow').onclick = onClickFilterAppointments;
    divWrapper.querySelector('#thisweek').onclick = onClickFilterAppointments;
    divWrapper.querySelector('#nextweek').onclick = onClickFilterAppointments;
    divWrapper.querySelector('#thismonth').onclick = onClickFilterAppointments;

    divWrapper.querySelector('#dropdown_all').onclick = onClickGetTypeAppointments;
    divWrapper.querySelector('#dropdown_meeting').onclick = onClickGetTypeAppointments;
    divWrapper.querySelector('#dropdown_call').onclick = onClickGetTypeAppointments;
    divWrapper.querySelector('#dropdown_medical').onclick = onClickGetTypeAppointments;
    divWrapper.querySelector('#dropdown_workshop').onclick = onClickGetTypeAppointments;
    divWrapper.querySelector('#dropdown_other').onclick = onClickGetTypeAppointments;

    renderAppointmentList(currentUser.email);

    root.innerHTML='';
    root.appendChild(divWrapper);
}

export function buildAppointmentCard(appointment){
    const div = document.createElement('div');
    div.classList.add('card', 'm-2', 'p-2', 'd-inline-block');
    div.style.border = '3px solid';
    div.style.width = '18rem';
    if(appointment.appointmentType == 'meeting'){
        div.classList.add('border-primary');
    }
    else if(appointment.appointmentType == 'call'){
        div.classList.add('border-secondary');
    }
    else if(appointment.appointmentType == "doctor"){
        div.classList.add('border-success');
    }
    else if(appointment.appointmentType == "workshop"){
        div.classList.add('border-danger');
    }
    else if(appointment.appointmentType == "other"){
        div.classList.add('border-warning');
    }
    div.innerHTML = `
        <div class="card-body" id="${appointment.docId}">
            <h5 class="card-title">${appointment.appointmentTitle}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${appointment.appointmentDate} ${appointment.appointmentTime}</h6>
            <p class="card-text">${appointment.appointmentNotes}</p>
            <p class="card-text" style="display: none">${appointment.appointmentType}</p>
            <p class="card-text" style="display: none">${appointment.earlyRemainder}</p>
            <button class="btn btn-outline-primary" id="edit">Edit</button>
            <button class="btn btn-outline-danger" id="delete">Delete</button>
        </div>
    `;
    const editButton = div.querySelector('#edit');
    const deleteButton = div.querySelector('#delete');
    editButton.onclick = onClickEditAppointment;
    deleteButton.onclick = onClickDeleteAppointment;
    return div;
}