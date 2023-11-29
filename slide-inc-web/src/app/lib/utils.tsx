import CryptoJS from "crypto-js";

export async function convertEmailToNode(email: string) {
    return email.replace(".", "%")
}

export async function convertNodeToEmail(node: string) {

}
