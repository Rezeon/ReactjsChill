import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Prof from "../assets/icon/Prof.png";
import { fetchMovies, fetchPremiums } from "../api/api";
import { auth, googleProvider, db } from "../api/firebase";
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { saveUserToFirestore } from "../api/addmovie";
export const UserContext = createContext();
const generateToken = () => {
  return (
    Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
  );
};

export const UserProvider = ({ children }) => {
  const loggedInUser = auth.currentUser;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setconpassword] = useState("");
  const [newEmail, setnewEmail] = useState(loggedInUser?.email || "");
  const [newPassword, setnewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || Prof
  );
  const [isPremium, setPremium] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");

  const [Post, setFilm] = useState([]);
  const [Prem, setBuy] = useState([]);
  const [PremSel, setPremSel] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(() =>
    Post.find((f) => f.id === 2)
  );
  const [popUp, setPop] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== conpassword) {
      toast.error("Password tidak cocok!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      toast.success("Registrasi Berhasil!");
      window.location.href = "/ReactjsChill/#";
    } catch (err) {
      toast.error("Gagal Registrasi: " + err.message);
    }
    saveUserToFirestore();
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
      toast.success("Login dengan Google berhasil!");
    } catch (err) {
      toast.error("Gagal Login dengan Google: " + err.message);
    }
  };

  const handlePremium = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("❌ User ID tidak valid.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        isPremium: !isPremium,
      });

      setPremium((prev) => !prev);
      console.log(`✅ Status isPremium diubah menjadi ${!isPremium}`);
    } catch (error) {
      console.error("❌ Error mengubah status isPremium:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = generateToken();

      const loggedInData = {
        email: userCredential.user.email,
        token,
        isPremium: userCredential.user.isPremium || false,
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInData));
      localStorage.setItem("authToken", token);

      toast.success("Login Berhasil!");
      window.location.href = "/ReactjsChill/#";
    } catch (err) {
      toast.error("Gagal Login: " + err.message);
    }
  };
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logout berhasil");
    } catch (error) {
      console.error("Error saat logout:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login dengan Google Berhasil!");
      const token = generateToken();
      const loggedInData = { ...email, token };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInData));
      localStorage.setItem("authToken", token);
      window.location.href = "/ReactjsChill/#";
    } catch (err) {
      toast.error("Gagal Login dengan Google: " + err.message);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      if (!auth.currentUser) {
        toast.error("User belum login!");
        return;
      }

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updateEmail(auth.currentUser, newEmail);
      toast.success("Email berhasil diperbarui!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!auth.currentUser) {
        toast.error("User belum login!");
        return;
      }

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password berhasil diperbarui!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleImageUpload = (event) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    
    const file = event.target.files[0];

    if (file && loggedInUser) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;

            setProfileImage(imageData);

            const updatedLoggedInUser = { ...loggedInUser, profileImage: imageData };
            localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));

            const updatedUsers = users.map((user) =>
                user.email === loggedInUser.email ? updatedLoggedInUser : user
            );

            localStorage.setItem("users", JSON.stringify(updatedUsers));
        };

        reader.readAsDataURL(file);
    }
};


  useEffect(() => {
    const fetchFavorites = async () => {
      if (!loggedInUser) return;

      const userRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);
      console.log("Logged in user:", loggedInUser); // Debugging

      if (userSnap.exists()) {
        console.log("User data:", userSnap.data()); // Debugging
        setFavoriteFilms(userSnap.data().favoriteFilms || []);
      }
    };

    fetchFavorites();
  }, [loggedInUser]); // Tambahkan loggedInUser di dependency array

  const addFavoriteFilm = async (filmId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("❌ User ID tidak valid.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favoriteFilms: arrayUnion(filmId),
      });

      setFavoriteFilms((prev) => [...prev, filmId]);
      console.log(`✅ Film ${filmId} berhasil ditambahkan ke favorit!`);
    } catch (error) {
      console.error("❌ Error menambahkan film:", error);
    }
  };

  const removeFavoriteFilm = async (filmId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("❌ User ID tidak valid.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favoriteFilms: arrayRemove(filmId),
      });

      setFavoriteFilms((prev) => prev.filter((id) => id !== filmId));
      console.log(`✅ Film ${filmId} berhasil dihapus dari favorit!`);
    } catch (error) {
      console.error("❌ Error menghapus film:", error);
    }
  };

  const handleImageClick = (filmId) => {
    const film = Post.find((f) => f.id === filmId);

    setSelectedFilm(null || film);
  };

  const handlePrem = (premid) => {
    const premi = Prem.find((p) => p.id === premid);
    setPremSel(null || premi);
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setFilm(data);
    };
    getMovies();
  }, []);
  useEffect(() => {
    const getPremiums = async () => {
      const data = await fetchPremiums();
      setBuy(data);
    };
    getPremiums();
  }, []);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.favoriteFilms) {
      setFavoriteFilms(loggedInUser.favoriteFilms);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        Post,
        Prem,
        email,
        password,
        isPremium,
        handlePremium,
        conpassword,
        newEmail,
        newPassword,
        handlePrem,
        PremSel,
        setPremSel,
        setnewEmail,
        setnewPassword,
        handleRegister,
        handleLogin,
        setEmail,
        handleUpdateEmail,
        setPassword,
        setconpassword,
        handleImageUpload,
        setProfileImage,
        profileImage,
        setPremium,
        favoriteFilms,
        setFavoriteFilms,
        addFavoriteFilm,
        removeFavoriteFilm,
        handleImageClick,
        setPop,
        selectedFilm,
        popUp,
        handleGoogleSignIn,
        handleGoogleLogin,
        handleUpdatePassword,
        setCurrentPassword,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useDataContext = () => useContext(UserContext);
