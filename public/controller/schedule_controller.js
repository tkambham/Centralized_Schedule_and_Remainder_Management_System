export function onChangeApponinmentTime(e) {
    const time = e.target.value;
    const earlyRemainder = document.querySelector('#early-remainder');
    console.log(time);
    earlyRemainder.classList.replace('d-none', 'd-block');
}

export function onClickSaveAppointment() {
    console.log('Appointment saved');
}