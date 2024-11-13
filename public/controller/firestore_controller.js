import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
 } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

import { app } from "./firebase_core.js";
import { currentUser } from "./firebase_auth.js";
import { DEV } from "../model/constants.js";
import { Appointments } from "../model/appointments.js";

const APPOINTMENT_COLLECTION = 'appointments_collection';

const db = getFirestore(app);

export async function addAppointment(appointment){
    const collRef = collection(db, APPOINTMENT_COLLECTION);
    const docRef = await addDoc(collRef, appointment.toFirestore());
    return docRef.id;
}

export async function getAppointmentList(email){
    let appointmentList = [];
    const q = query(collection(db, APPOINTMENT_COLLECTION),
        where('email', '==', email),
        orderBy('appointmentDate'),
        orderBy('appointmentTime')
    );

    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const i = new Appointments(doc.data());
        i.set_docId(doc.id);
        appointmentList.push(i);
    });

    return appointmentList;
}