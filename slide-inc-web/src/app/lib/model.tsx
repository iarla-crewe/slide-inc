export class Doctor {
    phone: string;
    email: string;
    encryptedPassword: string;
    name: string;
    practice: string;

    constructor(phone: string, email: string, encryptedPasswword: string, name: string, practice: string) {
        this.phone = phone;
        this.email = email;
        this.encryptedPassword = encryptedPasswword;
        this.name = name;
        this.practice = practice;
    }
}

export class Patient {
    phone: string;
    email: string;
    encryptedPassword: string;
    gpPhone: string;
    height: number;
    name: string;
    policyNumber: number;
    sex: boolean;
    weight: number;

    constructor(phone: string, email: string, encrypedPassword: string, gpPhone: string, height: number, name: string, policyNumber: number, sex: boolean, weight: number) {
        this.phone = phone;
        this.email = email;
        this.encryptedPassword = encrypedPassword;
        this.gpPhone = gpPhone;
        this.height = height;
        this.name = name;
        this.policyNumber = policyNumber;
        this.sex = sex;
        this.weight = weight;
    }
}
