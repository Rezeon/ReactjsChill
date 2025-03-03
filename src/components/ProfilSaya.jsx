import PosterFilm from "./molekul/PosterFilm";
import "../assets/styles/ProfilSaya.css"
import Warning from "../assets/icon/Warning.png"
import Vector from "../assets/icon/Vector.png"
import { useDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";
function ProfilSaya() {
    const {Post,newUsername, newPassword, setnewUsername, setnewPassword, handleSave,handleImageUpload} = useDataContext();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};


    const onImageClick = (filmid) => {
        console.log(filmid)
    }
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
                    <img src={loggedInUser.profileImage} alt="Profil" />
                            <div className="ub">
                            <label className="btnup">
                                Ubah Foto
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    style={{ display: "none" }} 
                                />
                            </label>

                                <div className="ma">
                                    <img src={Vector} alt="" /> Maksimal 2MB
                                </div>
                            </div>

                    </div>
                    <input type="text" className="namm" value={newUsername} defaultValue={loggedInUser.username} placeholder="Nama Pengguna" onChange={(e) => setnewUsername(e.target.value)} />
                    <input type="text" className="emaill" placeholder="Email" />
                    <input type="text" className="sandii" value={newPassword} defaultValue={loggedInUser.password}  placeholder="Kata Sandi" onChange={(e) => setnewPassword(e.target.value)} />
              </div>
                {!loggedInUser.premium ? (
                  <>
                    <div className="pre">
                      <div className="infopre">
                        <img src={Warning} alt="" />
                        <div className="preee">
                          <div className="juf">Saat ini anda belum berlangganan</div>
                          <div className="ing">Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaanmu</div>
                        </div>
                      </div>
                    <Link className="byrto" to="/langgan">Mulai Berlanggan</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pre2">
                      <div className="infopremiumuser">
                        <div className="aktifpremium">Aktif</div>
                        <div className="aktifpremiuminfo">
                          <div className="hap2">Anda sudah berlangganan✨</div>
                          <div className="ing">Selamat anda bisa menikmati akses premium</div>
                        </div>
                      </div>
                      <div className="berlaku">berlaku sampai {tanggal}-{bulan}-{tahun}</div>
                    </div>
                  </>
                )}

          </div>
            <button className="simpan" onClick={handleSave}>Simpan</button>
        </div>
        <div className="daf">
            {Post.map((film) => 
                <PosterFilm film={film} onImageClick={onImageClick} />
                )}
        </div>
      </div>
    )
}

export default ProfilSaya;