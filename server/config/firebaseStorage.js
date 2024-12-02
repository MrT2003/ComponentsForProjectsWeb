import {initializeApp, cert } from "firebase-admin/app";
import {getStorage} from "firebase-admin/storage";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
    credential: cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X500_CERT_URL ,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage().bucket();
console.log("Initialized Storage Bucket:", storage.name);

storage.exists().then(([exists]) => {
    console.log("Bucket exists:", exists);
}).catch((err) => {
    console.error("Error verifying bucket:", err.message);
});

export default storage;