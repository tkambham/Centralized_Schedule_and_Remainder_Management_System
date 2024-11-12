import { Appointments } from "../model/appointments.js";
import { currentUser } from "./firebase_auth.js";

export function onChangeApponinmentTime(e) {
    const time = e.target.value;
    const earlyRemainder = document.querySelector('#early-remainder');
    earlyRemainder.classList.replace('d-none', 'd-block');
}

export async function onClickSaveAppointment(e) {
    e.preventDefault();
    const appointmentTitle = e.target.appointment_title.value.trim();
    const appointmentDate = e.target.appointment_date.value;
    const appointmentTime = e.target.appointment_time.value;
    const earlyRemainder = e.target.early_remainder_time.value;
    const appointmentType = e.target.appointment_type.value;
    const appointmentNotes = e.target.appointment_notes.value.trim();

    console.log(appointmentTitle, appointmentDate, appointmentTime, earlyRemainder, appointmentType, appointmentNotes);

    const appointment = new Appointments({
        appointmentTitle,
        appointmentDate,
        appointmentTime,
        earlyRemainder,
        appointmentType,
        appointmentNotes,
        createdBy: currentUser.email
    });

    try{
        const docId = await addAppointment(appointment);
        Appointments.set_docId(docId);
    }
    catch(e){
        console.log('Failed to save appointment', e);
        alert('Failed to save appointment' + JSON.stringify(e));
        return;
    }

    e.target.reset();
}