import axios from "axios";

const FIREBASE_PROJECT_ID = "tugas-axios";
const FIREBASE_API_KEY = "AIzaSyBrLiO6Jowa30H6oJgvlOLavr8lceGyHcc";
const COLLECTION_NAME = "movies";
const COLLECTION_PREM = "premiums";

const parseFirestoreData = (data) => {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            if (value.nullValue !== undefined) return [key, null];
            if (value.stringValue !== undefined) return [key, value.stringValue];
            if (value.integerValue !== undefined) return [key, parseInt(value.integerValue, 10)];
            if (value.doubleValue !== undefined) return [key, parseFloat(value.doubleValue)];
            if (value.booleanValue !== undefined) return [key, value.booleanValue];
            if (value.arrayValue && value.arrayValue.values) {
                return [key, value.arrayValue.values.map(v => parseFirestoreData(v) || "")];
            }
            if (value.mapValue && value.mapValue.fields) {
                return [key, parseFirestoreData(value.mapValue.fields)];
            }
            return [key, value];
        })
    );
};

export const fetchMovies = async () => {
    try {
        const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION_NAME}?key=${FIREBASE_API_KEY}`
        );

        if (!response.data.documents) {
            console.error("Data movies tidak ditemukan!");
            return [];
        }

        const movies = response.data.documents.map((doc) => {
            const fields = doc.fields;

            return {
                id: fields.id?.integerValue ? parseInt(fields.id.integerValue) : null,
                title: fields.movie?.stringValue || "No Title",
                age_rating: fields.age_rating?.stringValue || "",
                cast: fields.cast?.arrayValue?.values
                    ? fields.cast.arrayValue.values.map((item) => item.stringValue || "")
                    : [],
                description: fields.description?.stringValue || "",
                director: fields.director?.stringValue || "",
                episodes: fields.episodes?.integerValue || 0,
                genre: fields.genre?.arrayValue?.values
                    ? fields.genre.arrayValue.values.map((item) => item.stringValue || "")
                    : [],
                img: fields.img?.stringValue || "",
                img2: fields.img2?.stringValue || "",
                new: fields.new?.booleanValue || false,
                rating: fields.rating?.doubleValue
                    ? parseFloat(fields.rating.doubleValue)
                    : fields.rating?.integerValue
                    ? parseInt(fields.rating.integerValue)
                    : 0,
                trailer: fields.trailer?.stringValue || "",
            };
        });

        console.log("Movies:", movies);
        return movies;
    } catch (err) {
        console.error("Error fetching data movies:", err);
        return [];
    }
};


export const fetchPremiums = async () => {
    try {
        const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION_PREM}?key=${FIREBASE_API_KEY}`
        );

        console.log("Raw Response from Firestore:", response.data);

        if (!response.data.documents) {
            console.error("Data premiums tidak ditemukan!");
            return [];
        }

        const premium = response.data.documents.map((doc) => {
            const fields = parseFirestoreData(doc.fields); // Parsing semua data

            return {
                id: doc.name.split("/").pop(),
                jenis: fields.jenis || "Unknown",
                price: fields.price || 0,
                accounts: fields.accounts || "N/A",
                features: Array.isArray(fields.features) ? fields.features : [],
            };
        });

        console.log("Premiums (Processed):", premium);
        return premium;
    } catch (err) {
        console.error("Error fetching data premiums:", err);
        return [];
    }
};
