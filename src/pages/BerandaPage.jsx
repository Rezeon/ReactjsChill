import FilmList from "../components/FilmList";
import ContinueWatch from "../components/ContinueWatch";
import PopupFilm from "../components/molekul/PopupFilm";
import FilmStart from "../components/FilmStart";
import { useState } from "react";
import { useDataContext } from "../context/UserContext";
import Modal from "react-modal";
import "../assets/styles/BerandaPage.css"
import Trailer  from '../assets/trailer'
import '../../'

Modal.setAppElement("#root");

function BerandaPage() {
    const {Post, handleImageClick, selectedFilm} = useDataContext();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const [popUp,setPop] = useState(false);


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
        {!loggedInUser.premium ? (
            <>
            
            </>
        ) : (
            <>
            <FilmList judul={"Series pilihan CHILL✨"} Film={Post.filter(film =>film.episodes > 1 && film.rating > 4.1)} onImageClick={handleImageClick}
                /> 
            </>
        ) }
        <FilmList judul={"Film Trending"} Film={Post.filter(film =>film.rating > 4.5)} onImageClick={handleImageClick}/>
        <FilmList judul={"Rilis Baru"} Film={Post.filter(film =>film.new === true)} onImageClick={handleImageClick} />
     </div>
    
        
    )
}

export default BerandaPage;