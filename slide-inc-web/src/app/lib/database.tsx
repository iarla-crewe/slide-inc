import { ref, set } from "firebase/database"
import { database } from "../firebaseConfig.js"
import { encryptPassword } from "./utils"
import { randomBytes } from "crypto"

const DOCTORS_PATH = "doctors/"
const PATIENTS_PATH = "patients/"

const PHONE_REGEX = /^\+\d*$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function createDoctor(phone: string, email: string, name: string, practice: string, password: string) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false
    }

    if(!EMAIL_REGEX.test(email)) {
        console.log("Invalid email: " + email)
        return false
    }

    const reference = ref(database, DOCTORS_PATH + phone)
    const encryptedPassword = await encryptPassword(password)

    set(reference, {
        email: email,
        name: name,
        encryptedPassword: encryptedPassword,
        practice: practice
    })
    
    return true
}

export async function createPatient(
    gpPhone: string, phone: string, email: string, name: string, policyNumber: number, sex: boolean, height: number, weight: number
) {
    if(!PHONE_REGEX.test(phone)) {
        console.log("Invalid phone number: " + phone)
        return false
    }

    if(!EMAIL_REGEX.test(email)) {
        console.log("Invalid email: " + email)
        return false
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

    return plainTextPassword
}

// export function getDoctor(phone: string) {
//     const reference = ref(database, DOCTORS_PATH + )
// }
