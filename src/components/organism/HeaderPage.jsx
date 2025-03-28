import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "../../assets/styles/HeaderPage.css";
import { useState } from "react";
import { useDataContext } from "../../context/UserContext";

function HeaderPage () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const [isOpen, setIsOpen] = useState(false);
    const { handleLogout } = useDataContext
    return (
        <header>
            <div className="nav">
                <Link to="/" className="logorre">
                    <img src={Logo} alt="" /><p>CHILL</p>
                </Link>
                <Link to="/series">Series</Link>
                <Link to="/film">Film</Link>
                <Link to="/daftarsaya">Daftar Saya</Link>
            </div>
            <div className="profile" >
                <img src={loggedInUser.profileImage} alt="" />
                <div onClick={() => setIsOpen(!isOpen)}>▼</div >
                {isOpen && (
              <ul className="st" onClick={() => setIsOpen(!isOpen)}>
                <Link to="/profilsaya" >
                👤Profil Saya
                </Link>
                <hr />
                <Link to="/langgan" >
                ⭐Ubah ke Premium
                </Link>
                <hr />
                <Link to="/login" onClick={() => 
                      handleLogout
                    }>Logout</Link>
              </ul>
        )}

            </div>

        </header>
    )
}

export default HeaderPage;