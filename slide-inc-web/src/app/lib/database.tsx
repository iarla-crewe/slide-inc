import { ref, set, onValue } from "firebase/database"
import { database } from "../firebaseConfig"
import { encryptPassword } from "./utils"
import { randomBytes } from "crypto"
import { Doctor, Patient } from "./model"

const DOCTORS_PATH = "doctors/"
const PATIENTS_PATH = "patients/"

const PHONE_REGEX = /^\+\d*$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function createDoctor(phone: string, email: string, name: string, practice: string, password: string) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return null;
    }

    if(!EMAIL_REGEX.test(email)) {
        console.log("Invalid email: " + email)
        return null;
    }

    const reference = ref(database, DOCTORS_PATH + phone)
    const encryptedPassword = await encryptPassword(password)

    set(reference, {
        email: email,
        name: name,
        encryptedPassword: encryptedPassword,
        practice: practice
    })
    
    return true;
}

export async function createPatient(
    gpPhone: string, phone: string, email: string, name: string, policyNumber: number, sex: boolean, height: number, weight: number
) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return null;
    }

    if(!EMAIL_REGEX.test(email)) {
        console.log("Invalid email: " + email)
        return null;
    }
    
    const reference = ref(database, PATIENTS_PATH + phone)

    const plainTextPassword = randomBytes(10).toString("hex")
    const encryptedPassword = await encryptPassword(plainTextPassword)

    set(reference, {
        email: email,
        name: name,
        encryptedPassword: encryptedPassword,
        gpPhone: gpPhone,
        policyNumber: policyNumber,
        sex: sex,
        height: height,
        weight: weight
    })

    return plainTextPassword;
}

export function getDoctor(phone: string) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return null;
    }

    const reference = ref(database, DOCTORS_PATH + phone)
    onValue(reference, (snapshot) => {
        const data = snapshot.val()
        if (data == null) return null;
    
        const doctor = new Doctor(
            phone,
            data.email,
            data.encryptedPassword,
            data.name,
            data.practice
        )
        return doctor;
    })
}

export function getPatient(phone: string) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return null;
    }

    const reference = ref(database, PATIENTS_PATH + phone)
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        if (data == null) return null;

        const patient = new Patient(
            phone,
            data.email,
            data.encryptedPassword,
            data.gpPhone,
            data.height,
            data.name,
            data.policyNumber,
            data.sex,
            data.weight
        );
        return patient;
    })
}

export function getAllPatientsOfDoctor(phone: string) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return null;
    }

    const reference = ref(database, PATIENTS_PATH)
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        if (data == null) return null;
        
        let patients: Object[] = [];
        for(let index of Object.keys(data)) {
            let patient = data[index];
            if(patient.gpPhone === phone) patients.push(patient);
        };

        if (patients.length === 0) return null;
        return patients;
    })
}
