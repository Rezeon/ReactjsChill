import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveUserToFirestore = async () => {
  const user = auth.currentUser; 

  if (!user || !user.uid) {
    console.log("❌ User ID tidak valid.");
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      favoriteMovies: [],
      isPremium: false,
      profilePicture: "",
    });

    console.log("✅ Data user berhasil disimpan ke Firestore!");
  } catch (error) {
    console.error("❌ Error menyimpan data:", error);
  }
};
