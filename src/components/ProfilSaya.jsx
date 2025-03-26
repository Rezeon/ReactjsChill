import PosterFilm from "./molekul/PosterFilm";
import "../assets/styles/ProfilSaya.css";
import Warning from "../assets/icon/Warning.png";
import Vector from "../assets/icon/Vector.png";
import { useDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { auth, db } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function ProfilSaya() {
  const {
    Post,
    newEmail,
    newPassword,
    setnewEmail,
    setnewPassword,
    handleUpdateEmail,
    handleUpdatePassword,
    handleImageUpload,
    isUploading,
  } = useDataContext();
  const loggedInUser = auth.currentUser;
  const userlc = JSON.parse(localStorage.getItem("loggedInUser")) || {};

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

  const onImageClick = (filmid) => {
    console.log(filmid);
  };
  const today = new Date();
  const tanggal = today.getDate();
  const bulan = today.getMonth() + 2;
  const tahun = today.getFullYear();
  return (
    <div className="qq">
      <div className="p">
        <div className="in">
          <div className="datap">
            <div className="ju">Profil Saya</div>
            <div className="pp">
              <img
                src={userlc.profileImage}
                alt="Profil"
              />
              <div className="ub">
              <label className="btnup">
                  {isUploading ? "Mengupload..." : "Ubah Foto"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    disabled={isUploading}
                  />
                </label>


                <div className="ma">
                  <img src={Vector} alt="" /> Maksimal 2MB
                </div>
              </div>
            </div>
            <input
              type="text"
              className="namm"
              value={newEmail || loggedInUser?.email || ""}
              placeholder="Nama Pengguna"
              onChange={(e) => setnewEmail(e.target.value)}
            />

            <input
              type="text"
              className="emaill"
              value={newEmail}
              placeholder="Email"
              onChange={(e) => setnewEmail(e.target.value)}
            />

            <input
              type="text"
              className="sandii"
              value={newPassword || ""}
              placeholder="Kata Sandi"
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>
          {isPremium ? (
            <>
              <div className="pre2">
                <div className="infopremiumuser">
                  <div className="aktifpremium">Aktif</div>
                  <div className="aktifpremiuminfo">
                    <div className="hap2">Anda sudah berlangganan✨</div>
                    <div className="ing">
                      Selamat anda bisa menikmati akses premium
                    </div>
                  </div>
                </div>
                <div className="berlaku">
                  Berlaku sampai {tanggal}-{bulan}-{tahun}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="pre">
                <div className="infopre">
                  <img src={Warning} alt="" />
                  <div className="preee">
                    <div className="juf">Saat ini anda belum berlangganan</div>
                    <div className="ing">
                      Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series
                      Kesukaanmu
                    </div>
                  </div>
                </div>
                <Link className="byrto" to="/langgan">
                  Mulai Berlanggan
                </Link>
              </div>
            </>
          )}
        </div>
        <button
          className="simpan"
          onClick={async () =>
            await (handleUpdatePassword(), handleUpdateEmail())
          }
        >
          Simpan
        </button>
      </div>
      <div className="daf">
        {Post.map((film) => (
          <PosterFilm film={film} onImageClick={onImageClick} />
        ))}
      </div>
    </div>
  );
}

export default ProfilSaya;
