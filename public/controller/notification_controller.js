import { currentUser } from "./firebase_auth.js";
import { app } from "./firebase_core.js";
import { renderAppointmentListForNotification } from "./home_controller.js";


export function notifyUser(title, message) {
    if (Notification.permission === "granted") {
        new Notification(`Appointment Reminder: ${title}`, { body: message });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(`Appointment Reminder: ${title}`, { body: message });
                window.alert("Appointment Reminder", { body: message });
            }
        });
    }
}

export function checkAppointmentsForNotifications(appointments){

    const now = new Date();

    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.appointmentDate + " " + appointment.appointmentTime);
        const earlyReminderTime = new Date(appointment.appointmentDate + " " + appointment.earlyRemainder);

        if (isTimeForNotification(appointmentDate, now)) {
            notifyUser(appointment.appointmentTitle, `Your appointment ${appointment.appointmentTitle} is starting now!\n${appointment.appointmentNotes}`);
        }
    });
}

function isTimeForNotification(targetTime, currentTime) {
    const diff = targetTime - currentTime;
    return diff <= 0 && diff >= -60000;
}

setInterval(() => {
    renderAppointmentListForNotification(currentUser.email);
}, 60000);