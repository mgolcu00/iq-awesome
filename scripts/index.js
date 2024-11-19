const { initializeApp } = require("firebase/app");
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    getDocs,
    deleteDoc
} = require("firebase/firestore");
const fs = require("fs"); // For reading the JSON file

// Firebase configuration (from your provided credentials)
const firebaseConfig = {
    apiKey: "AIzaSyB3faTtcfrhmvbxNLF17AQHK1uQ1NiaXYg",
    authDomain: "iq-awesome-1.firebaseapp.com",
    projectId: "iq-awesome-1",
    storageBucket: "iq-awesome-1.firebasestorage.app",
    messagingSenderId: "634948873230",
    appId: "1:634948873230:web:472446194d55556183605f",
    measurementId: "G-8HED7F80TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Name of the collection to which data will be added
const COLLECTION_NAME = "questions"; // Replace "xx" with your desired collection name

// Function to add data from JSON to Firestore
const add = async (collectionName) => {
    try {
        // Read the JSON file
        const rawData = fs.readFileSync(`${collectionName}_add.json`, "utf-8"); // Replace with the path to your JSON file
        const jsonData = JSON.parse(rawData);

        // Add each item to Firestore
        for (const item of jsonData) {
            const collectionRef = collection(db, collectionName);
            const docRef = await addDoc(collectionRef, item);
            const id = docRef.id;
            await updateDoc(doc(db, collectionName, id), { id });
            console.log(`Added document with ID: ${id}`);
        }

        console.log("All data added to Firestore successfully!");
    } catch (error) {
        console.error("Error adding data to Firestore:", error);
    }
};

const fetch = async (collectionName) => {
    try {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);

        if (snapshot.empty) {
            console.log("No matching documents.");
            return;
        }

        var data = [];
        snapshot.forEach((docSnap) => {
            console.log(docSnap.id, "=>", docSnap.data());
            data.push(docSnap.data());
        });

        fs.writeFileSync(`${collectionName}_fetch.json`, JSON.stringify(data, null, 2));

        console.log("All documents fetched successfully!");
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
};

const clear = async (collectionName) => {
    try {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);

        if (snapshot.empty) {
            console.log("No matching documents.");
            return;
        }

        snapshot.forEach(async (docSnap) => {
            await deleteDoc(docSnap.ref);
            console.log(`Document with ID ${docSnap.id} deleted.`);
        });

        console.log("All documents deleted successfully!");
    } catch (error) {
        console.error("Error deleting documents:", error);
    }
};

const main = async () => {


    await clear(COLLECTION_NAME);
    await add(COLLECTION_NAME);
    await fetch(COLLECTION_NAME);


};

main()