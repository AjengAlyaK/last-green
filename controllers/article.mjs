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

export const addArticle = async (req, res) => {
    const { title, picture, link } = req.body;
    if (!title || !picture || !link) {
        return res.status(400).json({ error: "title, picture, and link are required." });
    }
    try {
        const addArticle = await addDoc(collection(db, "articles"), {
            title: title,
            picture: picture,
            link: link
        });
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                article: {
                    id: addArticle.id,
                    title,
                    picture,
                    link
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

export const allArticles = async (req, res) => {
    try {
        const articles = collection(db, 'articles');
        const articleSnapshot = await getDocs(articles);
        const articleList = articleSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return res.status(200).json({
            status: "success",
            message: "ok",
            data: {
                articles: articleList
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