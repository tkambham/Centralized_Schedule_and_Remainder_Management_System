export function onChangeApponinmentTime(e) {
    const time = e.target.value;
    const earlyRemainder = document.querySelector('#early-remainder');
    earlyRemainder.classList.replace('d-none', 'd-block');
}

export function onClickSaveAppointment(e) {
    e.preventDefault();
    const appointmentTitle = e.target.appointment_title.value.trim();
    const appointmentDate = e.target.appointment_date.value;
    const appointmentTime = e.target.appointment_time.value;
    const earlyRemainder = e.target.early_remainder_time.value;
    const appointmentType = e.target.appointment_type.value;
    const appointmentNotes = e.target.appointment_notes.value.trim();

    console.log(appointmentTitle, appointmentDate, appointmentTime, earlyRemainder, appointmentType, appointmentNotes);
}