import CryptoJS from "crypto-js";

export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = CryptoJS.SHA256(password + saltRounds).toString();
    return hashedPassword;
}

export function stringToPath(str: string) {
    return str
}

export function pathToString(path: string) {
    return path
}
