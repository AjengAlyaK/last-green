import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, addDoc, collection, getDocs, getDoc } from 'firebase/firestore/lite';
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

export const addCampaign = async (req, res) => {
    const { name, picture, location, description, date } = req.body;
    if (!name || !picture || !location || !description || !date) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const campaign = await addDoc(collection(db, "campaigns"), {
            name: name,
            picture: picture,
            location: location,
            description: description,
            date: date
        });
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                campaign: {
                    id: campaign.id,
                    name,
                    picture,
                    location,
                    description,
                    date
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

export const allCampaign = async (req, res) => {
    try {
        const campaigns = collection(db, 'campaigns');
        const campaignSnapshot = await getDocs(campaigns);
        const campaignList = campaignSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                campaigns: campaignList
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

export const campaignById = async (req, res) =>  {
    const campaignId = req.params.id;
    try {
        const campaignDoc = await getDoc(doc(db, 'campaigns', campaignId));
        if(!campaignDoc.exists()){
            return res.status(404).json({
                error: "Campaign not found"
            });
        }
        const campaignData = campaignDoc.data();
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                campaign: {
                    id: campaignDoc.id,
                    ...campaignData
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