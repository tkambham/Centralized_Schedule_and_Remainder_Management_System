import { protectedView } from "../view/protected_view.js";
import { currentUser } from "./firebase_auth.js";

export async function onEditAppointment(data) {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }

    const response = await fetch('../view/templates/edit_page_template.html', { cache: "no-store" });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    root.innerHTML = '';
    root.appendChild(divWrapper);

    const { appointmentName, appointmentDate, appointmentTime, appointmentNotes, appointmentType, earlyRemainder } = data;

    const titleInput = document.getElementById('appointment-title');
    const dateInput = document.getElementById('appointment-date');
    const timeInput = document.getElementById('appointment-time');
    const notesInput = document.getElementById('appointment-notes');
    const typeInput = document.getElementById('appointment-type');
    const remainderInput = document.getElementById('early-remainder-time');
    const modal = document.getElementById('editAppointmentModal');

    if (!titleInput || !dateInput || !timeInput || !notesInput || !typeInput || !remainderInput || !modal) {
        console.error("One or more required DOM elements are not found. Check your HTML structure and IDs.");
        return;
    }

    titleInput.value = appointmentName;
    dateInput.value = appointmentDate;
    timeInput.value = appointmentTime;
    notesInput.value = appointmentNotes;
    typeInput.value = appointmentType;
    remainderInput.value = earlyRemainder;

    modal.classList.remove('d-none');

    document.getElementById('save-appointment').onclick = () => {
        const updatedData = {
            appointmentId: data.appointmentId,
            appointmentName: titleInput.value,
            appointmentDate: dateInput.value,
            appointmentTime: timeInput.value,
            appointmentNotes: notesInput.value,
            appointmentType: typeInput.value,
            earlyRemainder: remainderInput.value,
        };

        console.log('Updated Data:', updatedData);

        modal.classList.add('d-none');
    };

    document.getElementById('cancel-appointment').onclick = () => {
        modal.classList.add('d-none');
        window.location.reload();
    };
}
