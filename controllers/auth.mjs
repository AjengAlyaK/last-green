import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { initializeApp, getApps, getApp } from 'firebase/app';

const fireInit = initializeApp({
    apiKey: "AIzaSyAvoE2J3KOZI_fRpk-NMtVQjAQ9ttHZi74",
    authDomain: "green-ee85d.firebaseapp.com",
    projectId: "green-ee85d",
    storageBucket: "green-ee85d.appspot.com",
    messagingSenderId: "568400099014",
    appId: "1:568400099014:web:e367f112230088d93f49c7",
    measurementId: "G-LJWPZYY3HN"
});

// getApps().length === 0 ? initializeApp(fireInit) : getApp();

// const db = getFirestore(getApp());
// const auth = getAuth(getApp());
const db = getFirestore(fireInit);
const auth = getAuth(fireInit);

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    // const photoURL = `https://ui-avatars.com/api/?name=${name}&background=random`;
    const formattedName = name.replace(/\s+/g, '+');
    const photoURL = `https://ui-avatars.com/api/?name=${formattedName}&background=random`;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide name, email, and password" });
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL });
        await setDoc(doc(db, 'users', user.uid), {
            // uid: user.uid,
            email: user.email,
            displayName: name,
            photoURL: photoURL,
            createdAt: new Date(),
        });
        return res.status(200).json({
            status: "success",
            message: "User created",
            data: {
                user: {
                    id: user.uid,
                    name: name,
                    email: user.email,
                    photo: photoURL
                }
            }
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        return res.status(401).json({ 
            status: "failed",
            message: "Try again",
            error: errorMessage 
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and password" });
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;
        const accessToken = user.stsTokenManager.accessToken;
        const id = user.uid;
        const userRef = doc(db, 'users', id);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            return res.status(404).json({ error: "User not found." });
        }
        const userData = userDoc.data();
        const photoURL = userData.photoURL;

        // const displayName = user.displayName;
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                id: id,
                name: user.displayName,
                photo: photoURL,
                token: accessToken
            }
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        return res.status(401).json({ 
            status: "failed",
            message: "Invalid credential",
            error: errorMessage 
        });
    }
}

export const logout = async (req, res) => {
    try {
        await signOut(auth);

        console.log("User signed out");

        return res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Logout error:", errorCode, errorMessage);
        return res.status(500).json({ 
            status: "failed",
            message: "log out failed",
            error: errorMessage });
    }
}
