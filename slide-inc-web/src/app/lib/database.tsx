import { ref, set, get, onValue } from "firebase/database"
import { database } from "../firebaseConfig"
import { Doctor, Patient } from "./model"

const DOCTORS_PATH = "doctors/"
const PATIENTS_PATH = "patients/"

const PHONE_REGEX = /^\+\d*$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

type PredictionsObj = {
    lung: number,
    heart: number,
    stroke: number
}

export function createDoctor(phone: string, email: string, name: string, practice: string): boolean {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false;
    }

    if (!EMAIL_REGEX.test(email)) {
        console.log("Invalid email: " + email)
        return false;
    }

    const reference = ref(database, DOCTORS_PATH + phone)

    set(reference, {
        email: email,
        name: name,
        practice: practice
    })

    return true;
}

export function createPatient(
    gpPhone: string, phone: string, email: string, name: string, policyNumber: number, sex: boolean, height: number, weight: number, dob: string
): boolean {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false;
    }

    if (!EMAIL_REGEX.test(email)) {
        console.log("Invalid email: " + email)
        return false;
    }

    const reference = ref(database, PATIENTS_PATH + phone)

    set(reference, {
        email: email,
        name: name,
        gpPhone: gpPhone,
        policyNumber: policyNumber,
        sex: sex,
        height: height,
        weight: weight,
        dob: dob,
        lungPrediction: '',
        heartPrediction: '',
        strokePrediction: '',
        healthScore: ''
    })

    return true;
}

export async function addLungPredictions(
    phone: string, prediction: string
): Promise<Boolean> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false;
    }

    const reference = ref(database, PATIENTS_PATH + phone + "/lungPrediction")

    await set(reference, prediction)

    return true;
}
export async function addHeartPredictions(
    phone: string, prediction: string
): Promise<Boolean> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false;
    }
    console.log("Adding heart prediction")

    const reference = ref(database, PATIENTS_PATH + phone + "/heartPrediction")

    await set(reference, prediction)

    return true;
}

export async function addStrokePredictions(
    phone: string, prediction: string
): Promise<Boolean> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false;
    }

    const reference = ref(database, PATIENTS_PATH + phone + "/strokePrediction")

    set(reference, prediction)

    return true;
}

export async function addHealthScore(
    phone: string, healthScore: number
): Promise<Boolean> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false;
    }

    const reference = ref(database, PATIENTS_PATH + phone + "/healthScore")

    set(reference, healthScore)

    return true;
}

export async function getDoctor(phone: string): Promise<Doctor | null> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return null;
    }

    const reference = ref(database, DOCTORS_PATH + phone);
    const result = get(reference).then((snapshot) => {
        const data = snapshot.val()
        if (data == null) return null;

        return new Doctor(
            phone,
            data.email,
            data.name,
            data.practice
        )
    }).catch((error) => {
        console.log('Could not read data from database: ' + error);
        return null;
    });

    return result;
}

export async function getPatient(phone: string): Promise<Patient | null> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return null;
    }

    const reference = ref(database, PATIENTS_PATH + phone)
    const result = get(reference).then((snapshot) => {
        const data = snapshot.val();
        if (data == null) return null;

        return new Patient(
            phone,
            data.email,
            data.gpPhone,
            data.height,
            data.name,
            data.policyNumber,
            data.sex,
            data.weight,
            data.dob
        );
    }).catch((error) => {
        console.log('Could not read data from database: ' + error);
        return null;
    })

    return result;
}

export async function getPatientsPredictions(phone: string): Promise<PredictionsObj | null> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return null;
    }

    const reference = ref(database, PATIENTS_PATH + phone)
    const result = get(reference).then((snapshot) => {
        const data = snapshot.val();
        if (data == null) return null;

        let predictions: PredictionsObj = {
            lung: data.lungPrediction,
            heart: data.heartPrediciton,
            stroke: data.strokePrediction,
        }

        console.log("perdictions object contents: ", predictions.lung, predictions.heart, predictions.stroke)

        return predictions
    }).catch((error) => {
        console.log('Could not read data from database: ' + error);
        return null;
    })

    return result;
}

export async function getAllPatientsOfDoctor(phone: string): Promise<Patient[]> {
    if (!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone);
        return [];
    }

    const reference = ref(database, PATIENTS_PATH)
    const result = get(reference).then((snapshot) => {
        const data = snapshot.val();
        if (data == null) return [];

        let patients: Patient[] = [];
        for (let index of Object.keys(data)) {
            if (data[index].gpPhone !== phone) continue;

            const patient = new Patient(
                index,
                data[index].email,
                data[index].gpPhone,
                data[index].height,
                data[index].name,
                data[index].policyNumber,
                data[index].sex,
                data[index].weight,
                data[index].dob
            )
            patients.push(patient);
        };

        return patients;
    }).catch((error) => {
        console.log('Could not read data from database: ' + error);
        return [];
    })

    return result;
}
