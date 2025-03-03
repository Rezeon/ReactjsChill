import { createContext,useEffect,useState,useContext } from "react";
import { toast } from "react-toastify";
import BuyPremium from "../assets/buy.json"
import Poster from "../assets/film.json"
import Prof from "../assets/icon/Prof.png"

export const UserContext = createContext();
const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  };  

export const UserProvider = ({ children }) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [conpassword, setconpassword] = useState("");
    const [newUsername, setnewUsername] = useState(loggedInUser.username || "");
    const [newPassword, setnewPassword] = useState(loggedInUser.password || "");
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || Prof);
    const [premium, setPremium] = useState(false);
    const [favoriteFilms, setFavoriteFilms] = useState([]);
    



    const [Post, setFilm] = useState([]);
    const [Prem, setBuy] = useState([]);
    const [PremSel, setPremSel] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(() => Post.find(f => f.id === 2));   
    const [popUp,setPop] = useState(false);
    
    const handleRegister = () => {
        if ( password !== conpassword ) {
            toast.error("password ada tidak cocok dengan konfirmasi password");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(user => user.username === username);

        if (userExists) {
            toast.error("Pengguna telah ada");
            return;
        }
        if (!username.endsWith("@gmail.com")) {
            toast.error("Email harus berakhiran '@gmail.com'");
             return;
        }

        users.push({username,password,premium});
        localStorage.setItem("users", JSON.stringify(users));
        toast.success("Registrasi Sudah Terdaftar");
        window.location.href="/login";
    }

    const handlePremium = () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    
        let userIndex = users.findIndex(user => user.username === loggedInUser.username);
    
        if (userIndex === -1) {
            toast.error("Pengguna tidak ditemukan!");
            return;
        }
    
        if (users[userIndex].premium) {
            toast.error("Pengguna sudah premium");
            return;
        }
    
        users[userIndex].premium = true;
    
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify({ 
            username: loggedInUser.username, 
            password: loggedInUser.password, 
            premium: true 
        }));
        setPremium(true);
    
        alert("Berhasil berlangganan premium!");
    };
    

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username && user.password === password); 
    
        if (user) {
            const token = generateToken();
            const loggedInData = { ...user, token };
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInData));
            localStorage.setItem("authToken", token);
            window.location.href = "/";
        } else {
            toast.error("Username atau password salah");
        }
    };
    

    const handleSave = () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const usernameExists = users.some(user => user.username === newUsername && user.username !== loggedInUser.username);
        if (usernameExists) {
            toast.error("Username telah digunakan");
            return;
        }

        users = users.map( user => {
            if (user.username === loggedInUser.username) {
                return { username: newUsername, password:newPassword };

            }
            return users;
        }) ;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify({ username: newUsername, password: newPassword }));
    
        alert("Perubahan berhasil disimpan");
        window.location.reload();
    }


    const handleImageUpload = (event) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result; 
    
                setProfileImage(imageData);
                localStorage.setItem("profileImage", imageData);
    
                const updatedUsers = users.map(user => 
                    user.username === loggedInUser.username ? { ...user, profileImage: imageData } : user
                );
    
                localStorage.setItem("users", JSON.stringify(updatedUsers));
                localStorage.setItem("loggedInUser", JSON.stringify({ ...loggedInUser, profileImage: imageData }));
            };
    
            reader.readAsDataURL(file); 
        }
    };
    

    const addFavoriteFilm = (filmId) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
        
        let newFavorites = loggedInUser.favoriteFilms ? [...loggedInUser.favoriteFilms] : [];
    
        if (!newFavorites.includes(filmId)) {
            newFavorites.push(filmId);
        }
    
        const updatedUsers = users.map(user => 
            user.username === loggedInUser.username ? { ...user, favoriteFilms: newFavorites } : user
        );
    
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedInUser", JSON.stringify({ ...loggedInUser, favoriteFilms: newFavorites }));
    
        setFavoriteFilms([...newFavorites]);
    };
    
    
      
    const removeFavoriteFilm = (filmId) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        let newFavorites = [];
    
        const updatedUsers = users.map(user => {
            if (user.username === loggedInUser.username) {
                const newFavorites = user.favoriteFilms ? user.favoriteFilms.filter(id => id !== filmId) : [];
                return { ...user, favoriteFilms: newFavorites };
            }
            return user;
        });
    
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedInUser", JSON.stringify({ ...loggedInUser, favoriteFilms: newFavorites }));
        setFavoriteFilms(newFavorites);
    };
    
    const handleImageClick = (filmId) => {
        const film = Post.find(f => f.id === filmId)
        
        setSelectedFilm(null || film)
    };

    const handlePrem = (premid) => {
        const premi = Prem.find(p => p.id === premid)
        setPremSel(null || premi)
    }

    useEffect(() => {
        setFilm(Poster);
        setBuy(BuyPremium);
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.favoriteFilms) {
        setFavoriteFilms(loggedInUser.favoriteFilms);
    }

    }, [])
    return (
        <UserContext.Provider value={{Post,Prem,username,password,premium,handlePremium,conpassword,newUsername,
                                      newPassword, handlePrem,PremSel,setPremSel,setnewUsername,
                                      setnewPassword,handleRegister,handleLogin,setUsername,handleSave,
                                      setPassword,setconpassword,handleImageUpload,setProfileImage,profileImage,
                                      setPremium,favoriteFilms, setFavoriteFilms,addFavoriteFilm,removeFavoriteFilm,
                                      handleImageClick, setPop, selectedFilm, popUp}}>
            {children}
        </UserContext.Provider>
    )
}

export const useDataContext = () => useContext(UserContext);