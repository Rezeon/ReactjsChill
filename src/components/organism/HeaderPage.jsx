import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Profile from "../../assets/icon/Prof.png";
import "../../assets/styles/HeaderPage.css";
import { useState } from "react";
import { useDataContext } from "../../context/UserContext";

function HeaderPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useDataContext(); 

  const handleLogoutClick = async () => {
    await handleLogout(); 
    navigate("/login"); 
  };

  return (
    <header>
      <div className="nav">
        <Link to="/" className="logorre">
          <img src={Logo} alt="Logo" />
          <p>CHILL</p>
        </Link>
        <Link to="/series">Series</Link>
        <Link to="/film">Film</Link>
        <Link to="/daftarsaya">Daftar Saya</Link>
      </div>
      <div className="profile">
        <img src={user?.profileImage || Profile} alt="Profile" />
        <div onClick={() => setIsOpen(!isOpen)}>▼</div>
        {isOpen && (
          <ul className="st">
            <li onClick={() => setIsOpen(false)}>
              <Link to="/profilsaya">👤 Profil Saya</Link>
            </li>
            <hr />
            <li onClick={() => setIsOpen(false)}>
              <Link to="/langgan">⭐ Ubah ke Premium</Link>
            </li>
            <hr />
            <li>
              <button onClick={handleLogoutClick} className="logout-button">🚪 Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default HeaderPage;
