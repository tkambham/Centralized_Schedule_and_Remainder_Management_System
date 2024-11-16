import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
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

export async function deleteAppointment(email, docId){
    const q = query(collection(db, APPOINTMENT_COLLECTION),
        where('email', '==', email),
    );

    const snapshot = await getDocs(q);
    snapshot.forEach(async doc => {
        if(doc.id == docId){
            await deleteDoc(doc.ref);
        }
    });
}

export async function editAppointment(email, docId, updatedData){
    const docRef = doc(db, APPOINTMENT_COLLECTION, docId);
    await updateDoc(docRef, updatedData);
}

export async function getTypeAppointmentList(email, type){
    let appointmentList = [];
    const q = query(collection(db, APPOINTMENT_COLLECTION),
        where('email', '==', email),
        where('appointmentType', '==', type),
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