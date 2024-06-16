import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { format } from 'date-fns';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initializeApp, getApps, getApp } from 'firebase/app';
import admin from 'firebase-admin';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, getDoc, query, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite';
import { register, login, logout } from './controllers/auth.mjs';
import { addCampaign, allCampaign, campaignById } from './controllers/campaign.mjs';
import { allReview, review } from './controllers/review.mjs';
import { addArticle, allArticles } from './controllers/article.mjs';
import 'firebase/firestore';
import { addDestination, allDestination, commentOnDestination, destinationById } from './controllers/destination.mjs';
import { addDiscussion, allDiscussion, commentOnDiscussion, discussionById, downVotesCommentOnDiscussion, downVotesOnDiscussion, netralVotesCommentOnDiscussion, netralVotesOnDiscussion, upVotesCommentOnDiscussion, upVotesOnDiscussion } from './controllers/discussion.mjs';
import { addAboutUs, allAboutUs } from './controllers/aboutUs.mjs';
// var serviceAccount = require("./key.json");

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
const port = 4000;

// const fireInit = initializeApp({
//     apiKey: "AIzaSyAvoE2J3KOZI_fRpk-NMtVQjAQ9ttHZi74",
//     authDomain: "green-ee85d.firebaseapp.com",
//     projectId: "green-ee85d",
//     storageBucket: "green-ee85d.appspot.com",
//     messagingSenderId: "568400099014",
//     appId: "1:568400099014:web:e367f112230088d93f49c7",
//     measurementId: "G-LJWPZYY3HN"
// });

getApps().length === 0 ? initializeApp({
    apiKey: "AIzaSyAvoE2J3KOZI_fRpk-NMtVQjAQ9ttHZi74",
    authDomain: "green-ee85d.firebaseapp.com",
    projectId: "green-ee85d",
    storageBucket: "green-ee85d.appspot.com",
    messagingSenderId: "568400099014",
    appId: "1:568400099014:web:e367f112230088d93f49c7",
    measurementId: "G-LJWPZYY3HN"
}) : getApp();

// getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "green-ee85d",
        "private_key_id": "3fa818b17d782a13ca265b616aee6f91658e1215",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDp+yVTk36tbMKT\nZLhGoJQ0T/UmJSGK/sy1rhaFFG6vvy0ZMLedfvT/SfWOfHu23pzi8VQS2D+WN24B\nhzTGnqNmZCNw0ppFv2irBJ3JCHAsijkNm4fzBdT3LFbjTwVH9MrUsGqWViQpDucl\nmlNzkYfQWDzwJh2uhMHwO902sWXeuIkjrDp/5pXUTMiBvQ8g11maLHF4q2K5NBnn\nFjBns+R4QqVy/zZchx2OgmI/97KYajzpzc9VTwAjMMxv7ArBLYxuw6qnlhCKIhgX\nlhI/pM9s09uGGU5qyvg3lmIXfTPE4JW+aTn2j7/ecsS2Q+dXNIY2uCzVBf8vMxpM\nEKDYiLCVAgMBAAECggEADkUn8KH1PuR8NXsWFhCjGVGrFOl80zpZB9eXPgSR/5v8\nRyYGfM+KZ6t+E3OaI/wNu3WWeBPCRQoaZnN1j4uLUapX0wC1Mf3Lh2qfqOwf00eW\n1TKgJv07ENwebHycSNgwKqqbxZF5YRusk0mHP2wnyVgoV0kr1EH6hglQo45MNToU\nGwuo3HnipLRFFldfeGPcfOybTiPYXbIG3aNUtx0mW4+lYhjMwHUbKRXvEVhBsDn9\nOac6sf0xdIo93eemAkJYGGoTzDTGhyl0TdhTcKDdUClZiz3kj45ExNiRoj6UyDNy\n3D3sJujYp2zoEpDJxKQFzW7m9qsCGiHhBcZHmIWcoQKBgQD+SGGubygTlWf6uRXC\nW68iEO2q5MqpYuava831S6cxhBNYosSH0TEZf83vLrPas1wilORAVM/L7E3Sbkyk\nCzmjZZ6h3ENHZcAOuIDmWxQE7EZkdica/p1QSyqJ6TPIN5ZwBV9LgeXHCeE1dhbg\np8Nru+wZ12veINXkTeeywQYhPQKBgQDrj6pedFroC1c0/XazEe3w56VdruV+wzkT\np2YN/cN2QTv8MYGoH3z7RUSMOHEPIyNm5FnP/yi17cNf9iAD4/sPm6zuQpuwfNWd\nDAk9gkvhC59adX+RScukQ/QLPTI7qG5lBad244f9jXB6mNPJK/bveWgyqGuEUlH+\nGd+SQnkSOQKBgQDxvhxnejOuko681PLzyLgx+cgJfOOSr3zCbwnp1teHgpnl3TBc\nMqusI03DwzGnjHbeRZDN/BNlOi0uDkB8gFN2nOh31vB7UyeIly2sUhAxMfMmFRHO\nXxttt1gkrnjVMsupieHz5fVuCV16tt6/C58EsC6gzqU1EyBloQ7SaSGLvQKBgBU2\ntPMYq28mRk5BXUU3IiSF2ACd1ZEa57L7aldsOQQXT92gX7rSSyEd1dSC6LuiQHft\nrKDsq6/mn6eutKdlCqEXNfWnDfpQ47Pm95YQe+DieRFeb4SYDrzWWc4BTtrMilSS\ns8gjKYYODMkdpkUBrpVWa6nUPQqHl1a44cd8MQcRAoGARFC36cNsFRMbSKmKsHv+\noY955NzOAUeOsutKonK3oDWzMaf1pnlmHpjKes8V0w8FO4b5/UqzcRfmSzh2Oi51\nNPZFsKIGYB5NrUGygKyVcgs2F+/br6MN5QJQiHCquL3M0s8JMqqTa8edUOcR8OQN\nmJZwc84qnhJh329AWIXKduk=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-pqcea@green-ee85d.iam.gserviceaccount.com",
        "client_id": "100753832903180909097",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pqcea%40green-ee85d.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    })
});

const db = getFirestore();
const auth = getAuth();

// db: green

// middleware
const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

app.get('/', async (req, res) => {
    return res.status(200).json({
        status: "success"
    })
})

// Route for auth
app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

// Route for campaign
app.post('/campaign', addCampaign);
app.get('/campaigns', allCampaign);
app.get('/campaign/:id', campaignById);

// Route for people are talking
app.post('/review', review);
app.get('/reviews', allReview);

// Route for artikel
app.post('/article', addArticle);
app.get('/articles', allArticles);

// Destination
app.post('/destination', addDestination);
app.get('/destinations', allDestination);
app.get('/destination/:id', destinationById);
app.post('/destination/:id/comment', verifyToken, commentOnDestination);

// Discussion
app.post('/discussion', verifyToken, addDiscussion);
app.get('/discussions', allDiscussion);
app.post('/discussion/:id/up-votes', verifyToken, upVotesOnDiscussion);
app.post('/discussion/:id/down-votes', verifyToken, downVotesOnDiscussion);
app.post('/discussion/:id/netral-votes', verifyToken, netralVotesOnDiscussion);
app.post('/discussion/:id/comment', verifyToken, commentOnDiscussion);
app.get('/discussion/:id', discussionById);
app.post('/discussion/:id/comment/:id/up-votes', verifyToken, upVotesCommentOnDiscussion);
app.post('/discussion/:id/comment/:id/down-votes', verifyToken, downVotesCommentOnDiscussion);
app.post('/discussion/:id/comment/:id/netral-votes', verifyToken, netralVotesCommentOnDiscussion);

// About Us
app.post('/about-us', addAboutUs);
app.get('/about-us', allAboutUs);

// See Own Profile
app.get('/me', verifyToken, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "ok",
        data: {
            user: req.user.name,
            id: req.user.uid
        }
    });
});

// Authorization route
app.get('/authorize', verifyToken, (req, res) => {
    res.status(200).json({ message: 'User is authorized', user: req.user.id });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
