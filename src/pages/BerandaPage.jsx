import FilmList from "../components/FilmList";
import ContinueWatch from "../components/ContinueWatch";
import PopupFilm from "../components/molekul/PopupFilm";
import FilmStart from "../components/FilmStart";
import { useDataContext } from "../context/UserContext";
import Modal from "react-modal";
import "../assets/styles/BerandaPage.css"
import Trailer  from '../assets/trailer'
import { db, auth } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

function BerandaPage() {
    const {Post, handleImageClick, selectedFilm} = useDataContext();
      const loggedInUser = auth.currentUser;
    const [popUp,setPop] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    
      useEffect(() => {
        const fetchPremiumStatus = async () => {
          if (!loggedInUser) {
            console.log("❌ User belum login.");
            return;
          }
    
          try {
            const userRef = doc(db, "users", loggedInUser.uid);
            const userSnap = await getDoc(userRef);
    
            if (userSnap.exists()) {
              const userData = userSnap.data();
              console.log("✅ User premium status:", userData.isPremium);
              setIsPremium(userData.isPremium); 
            } else {
              console.log("⚠️ Data user tidak ditemukan.");
            }
          } catch (error) {
            console.error("❌ Error mengambil status premium:", error);
          }
        };
    
        fetchPremiumStatus();
      }, [loggedInUser]);


    return (
    
     <div>
        <FilmStart Film={selectedFilm} Trailer={Trailer} setPop={setPop} onImageClick={handleImageClick}/>
        <Modal
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" ,zIndex: 1000 },
        }}
        className="modal-content"
        isOpen={popUp}
        >
            <PopupFilm onClose={() => setPop(false)} Film={selectedFilm}/>
        </Modal>
        <ContinueWatch judul={"Melanjutkan Menonton Film"} Film={Post.filter(film =>film.rating >4.5)} onImageClick={handleImageClick}/>
        <FilmList judul={"Top Rating Film dan Series Hari Ini"} Film={Post.filter(film =>film.rating > 4)} onImageClick={handleImageClick} />
        {isPremium ? (
            <>
            <FilmList judul={"Series pilihan CHILL✨"} Film={Post.filter(film =>film.episodes > 1 && film.rating > 4)} onImageClick={handleImageClick}
                /> 
            </>
        ) : (
            <>
            
            </>
        ) }
        <FilmList judul={"Film Trending"} Film={Post.filter(film =>film.rating > 4.5)} onImageClick={handleImageClick}/>
        <FilmList judul={"Rilis Baru"} Film={Post.filter(film =>film.new === true)} onImageClick={handleImageClick} />
     </div>
    
        
    )
}

export default BerandaPage;