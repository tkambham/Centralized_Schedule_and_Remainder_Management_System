import { DEV } from "../model/constants.js";
import { getAppointmentList } from "./firestore_controller.js";
import { buildAppointmentCard } from "../view/home_page.js";

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
    if(inventoryList.length === 0){
        container.innerHTML = 'No appointments found';
        return;
    }
    appointmentList.forEach(appointment => {
        container.appendChild(buildAppointmentCard(appointment));
    });
}