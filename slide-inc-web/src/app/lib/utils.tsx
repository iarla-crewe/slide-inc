import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export function stringToPath(str: string) {
    return str
}

export function pathToString(path: string) {
    return path
}
