import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, addDoc, collection, getDocs, getDoc, query, where } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyAxWdJ-mNMjucjnVhv2821_nP5mVYPFS_k",
//     authDomain: "mostgreen.firebaseapp.com",
//     projectId: "mostgreen",
//     storageBucket: "mostgreen.appspot.com",
//     messagingSenderId: "415391017886",
//     appId: "1:415391017886:web:2d5ba7e2dc3cb2b971448f"
// };

// const fireInit = initializeApp(firebaseConfig);
const fireInit = initializeApp({
    apiKey: "AIzaSyAvoE2J3KOZI_fRpk-NMtVQjAQ9ttHZi74",
    authDomain: "green-ee85d.firebaseapp.com",
    projectId: "green-ee85d",
    storageBucket: "green-ee85d.appspot.com",
    messagingSenderId: "568400099014",
    appId: "1:568400099014:web:e367f112230088d93f49c7",
    measurementId: "G-LJWPZYY3HN"
});
const auth = getAuth(fireInit);
const db = getFirestore(fireInit);

export const addAboutUs = async (req, res) => {
    const { name, role, linkedin, github, email, photo } = req.body;
    try {
        const aboutUs = addDoc(collection(db, "about_us"),  {
            name: name,
            role: role,
            linkedin: linkedin,
            github: github,
            email: email,
            photo: photo
        });
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                aboutUs: {
                    id: aboutUs.id,
                    name: name,
                    role: role,
                    linkedin: linkedin,
                    github: github,
                    email: email,
                    photo: photo
                }
            }
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return res.status(400).json({
            error: {
                errorCode,
                errorMessage
            }
        });
    }
};

export const allAboutUs = async (req, res) => {
    try {
        const aboutUs = collection(db, "about_us");
        const aboutUsSnapshot = await getDocs(aboutUs);
        const aboutUsList = aboutUsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                aboutUs: aboutUsList
            }
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return res.status(400).json({
            error: {
                errorCode,
                errorMessage
            }
        });
    }
};

// little changes