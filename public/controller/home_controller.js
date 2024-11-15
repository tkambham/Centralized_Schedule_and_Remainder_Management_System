import { DEV } from "../model/constants.js";
import { deleteAppointment, getAppointmentList } from "./firestore_controller.js";
import { buildAppointmentCard } from "../view/home_page.js";
import { currentUser } from "./firebase_auth.js";

export async function renderAppointmentList(email){
    let appointmentList;
    try{
        appointmentList = await getAppointmentList(email);
    }
    catch(e){
        if(DEV) console.log('Failes to the appointment list', e);
        alert('Failed to load the appointment list', JSON.stringify(e));
        return;
    }
    const container =  document.getElementById('appointments-body');
    container.innerHTML = '';
    if(appointmentList.length === 0){
        container.innerHTML = 'No appointments found';
        return;
    }
    appointmentList.forEach(appointment => {
        container.appendChild(buildAppointmentCard(appointment));
    });
}

export function onClickEditAppointment(e){
    console.log('Edit appointment');
}

export async function onClickDeleteAppointment(e){
    if(!confirm('Are you sure you want to delete this appointment?')){
        return;
    }
    try{
        await deleteAppointment(currentUser.email, e.target.parentElement.id);
        renderAppointmentList(currentUser.email);
    }
    catch(error){
        if(DEV) console.error('Failed to delete the appointment', error);
        alert('Failed to delete the appointment', JSON.stringify(error));
    }
}