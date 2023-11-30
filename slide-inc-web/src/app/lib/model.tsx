export class Doctor {
    phone: string;
    email: string;
    name: string;
    practice: string;

    constructor(phone: string, email: string, name: string, practice: string) {
        this.phone = phone;
        this.email = email;
        this.name = name;
        this.practice = practice;
    }
}

export class Patient {
    phone: string;
    email: string;
    gpPhone: string;
    height: number;
    name: string;
    policyNumber: number;
    sex: boolean;
    weight: number;
    dob: string;

    constructor(phone: string, email: string, gpPhone: string, height: number, name: string, policyNumber: number, sex: boolean, weight: number, dob: string) {
        this.phone = phone;
        this.email = email;
        this.gpPhone = gpPhone;
        this.height = height;
        this.name = name;
        this.policyNumber = policyNumber;
        this.sex = sex;
        this.weight = weight;
        this.dob = dob;
    }
}
