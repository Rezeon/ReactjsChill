import "../assets/styles/LanggananChill.css"
import AK from "../assets/icon/4K.png"
import ADS from "../assets/icon/ADS.png"
import All from "../assets/icon/All.png"
import Mov from "../assets/icon/Mov.png"
import Mes from "../assets/icon/Mes.png"
import Don from "../assets/icon/Don.png"
import PremiumFilm from "./molekul/PremiumFilm"
import { useDataContext } from "../context/UserContext"

function LanggananChill() {
    const {Prem} = useDataContext()

    return (
        <div className="lan">
            <div className="pls">
                <div className="ju">Kenapa Harus Berlangganan</div>
                <div className="jan">
                    <div className="naj">
                        <div className="dwn">
                            <img src={Don} alt="" />
                            <div>Download Konten Pilihan</div>
                        </div>
                        <div className="dwn">
                            <img src={ADS} alt="" />
                            <div>Tidak Ada Iklan</div>
                        </div>
                        <div className="dwn">
                            <img src={Mov} alt="" />
                            <div>Tonton Semua Konten</div>
                        </div>
                    </div>
                    <div className="naj"> 
                        <div className="dwn">
                            <img src={AK} alt="" />
                            <div>Kualitas Maksimal sampai Dengan 4K</div>
                        </div>
                        <div className="dwn">
                            <img src={All} alt="" />
                            <div>Tonton di semua Device</div>
                        </div>
                        <div className="dwn">
                            <img src={Mes} alt="" />
                            <div>Subtitle Untuk Konten Pilihan</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pil">
                <div className="ju">Pilih Paketmu</div>
                <div className="inf">Sesuaikan Kebutuhanmu</div>
                <div className="pilihanm">
                    {Prem.map((prem) => 
                    <PremiumFilm prem={prem} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LanggananChill;