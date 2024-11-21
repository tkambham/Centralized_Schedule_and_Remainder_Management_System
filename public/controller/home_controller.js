import { DEV } from "../model/constants.js";
import { deleteAppointment, getAppointmentList, getFilteredAppointments } from "./firestore_controller.js";
import { buildAppointmentCard } from "../view/home_page.js";
import { currentUser } from "./firebase_auth.js";
import { onEditAppointment } from "./manage_conroller.js";
import { checkAppointmentsForNotifications } from "./notification_controller.js";

let appointmentType;
let startDate, endDate;


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
    appointmentType = '';
    buildContainer(appointmentList);
}

export function onClickEditAppointment(e){
    const appointmentId = e.target.parentElement.id;
    const appointmentName = e.target.parentElement.querySelector('.card-title').innerText;
    const appointmentDate = e.target.parentElement.querySelector('.card-subtitle').innerText.split(' ')[0];
    const appointmentTime = e.target.parentElement.querySelector('.card-subtitle').innerText.split(' ')[1];
    const appointmentNotes = e.target.parentElement.querySelector('.card-text').innerText;
    const appointmentType = e.target.parentElement.querySelectorAll('.card-text')[1].innerText;
    const earlyRemainder = e.target.parentElement.querySelectorAll('.card-text')[2].innerText;

    let data = {
        appointmentId,
        appointmentName,
        appointmentDate,
        appointmentTime,
        appointmentNotes,
        appointmentType,
        earlyRemainder,
    };

    onEditAppointment(data);

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
        if(DEV) console.log('Failed to delete the appointment', error);
        alert('Failed to delete the appointment', JSON.stringify(error));
    }
}

export function buildContainer(appointmentList){
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

export async function onClickGetTypeAppointments(e){
    appointmentType = e.target.innerHTML.toLowerCase();
    document.querySelector('#type_filter_dropdown').innerHTML = e.target.innerHTML;
    let appointmentList = [];
    try{
        if(appointmentType == '' && (startDate === undefined || endDate === undefined)){
            appointmentList = await getFilteredAppointments(currentUser.email, appointmentType);
        }
        else if(appointmentType == 'all' && startDate !== undefined && endDate !== undefined){
            appointmentList = await getFilteredAppointments(currentUser.email, "", formatDate(startDate), formatDate(endDate));
        }
        else if(appointmentType == 'all' && (startDate === undefined || endDate === undefined)){
            appointmentList = await getAppointmentList(currentUser.email);
        }
        else if(startDate === undefined || endDate === undefined){
            appointmentList = await getFilteredAppointments(currentUser.email, appointmentType);
        }
        else{
            appointmentList = await getFilteredAppointments(currentUser.email, appointmentType, formatDate(startDate), formatDate(endDate));
        }
    }
    catch(e){
        if(DEV) console.log('Failed to get the meeting appointments', e);
        alert('Failed to get the meeting appointments', JSON.stringify(e));
    }
    buildContainer(appointmentList);
}

export async function onClickFilterAppointments(e){
    const filter = e.target.id;
    document.getElementById('date_filter_dropdown').innerHTML = e.target.innerHTML;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneDay = 24 * 60 * 60 * 1000;

    if (filter === "today") {
        startDate = today;
        endDate = new Date(today.getTime() + oneDay);
    } else if (filter === "tomorrow") {
        startDate = new Date(today.getTime() + oneDay);
        endDate = new Date(today.getTime() + 2 * oneDay);
    } else if (filter === "thisweek") {
        const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
        startDate = new Date(today.getTime() - dayOfWeek * oneDay);
        endDate = new Date(startDate.getTime() + 7 * oneDay);
    } else if (filter === "nextweek") {
        const dayOfWeek = today.getDay();
        const startOfNextWeek = new Date(today.getTime() - dayOfWeek * oneDay + 7 * oneDay);
        startDate = startOfNextWeek;
        endDate = new Date(startOfNextWeek.getTime() + 7 * oneDay);
    } else if (filter === "thismonth") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    } else if (filter === "all") {
        startDate = today;
        let endDateString = "2099-12-31";
        endDate = new Date(endDateString);
        if(appointmentType === 'all'){
            appointmentType = '';
        }
    } 

    try {
        const appointmentList = await getFilteredAppointments(currentUser.email, appointmentType, formatDate(startDate), formatDate(endDate));
        buildContainer(appointmentList);
    } catch (error) {
        if (DEV) console.log('Failed to filter appointments:', error);
        alert('Failed to filter appointments:', JSON.stringify(error));
    }

}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Returns 'yyyy-mm-dd'
}

export async function renderAppointmentListForNotification(email) {
    let appointmentList;
    try{
        appointmentList = await getAppointmentList(email);
    }
    catch(e){
        if(DEV) console.log('Failes to the appointment list', e);
        alert('Failed to load the appointment list', JSON.stringify(e));
        return;
    }
    checkAppointmentsForNotifications(appointmentList);
}