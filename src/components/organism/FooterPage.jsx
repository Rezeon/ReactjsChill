import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import "../../assets/styles/FooterPage.css"
function FooterPage() {
    const [drowgen,setdropgen] = useState(false)
    const [drowban,setdropban] = useState(false)
    return (
        <footer>
            <hr />
        <div className="ar">
            <div className="re">
                <div className="cil">
                    <div className="nn">
                        <div className="chil">
                            <img src={Logo} alt="" />
                        </div>
                        <p>CHILL</p>
                    </div>
                    <div className="cre">
                     @2025 Chill Rheyno Fernando
                    </div>
                </div>
                    <div className="g">
                        <div className="ban">Genre <div className="updown" onClick={() => setdropgen(!drowgen)}>{drowgen ? " - " : " + "}</div>
                        </div>
                            <div className="listgen">
                                <div>Aksi</div>
                                <div>Anak-Anak</div>
                                <div>Anime</div>
                                <div>Britania</div>
                                <div>Drama</div>
                                <div>Fantasi & Ilmiah</div>
                                <div>Kejahatan</div>
                                <div>KDrama</div>
                                <div>Komedi</div>
                                <div>Petualangan</div>
                                <div>Perang</div>
                                <div>Romantis</div>
                            </div>
                        {drowgen && (
                            <div className="listgen2">
                                <div>Aksi</div>
                                <div>Anak-Anak</div>
                                <div>Anime</div>
                                <div>Britania</div>
                                <div>Drama</div>
                                <div>Fantasi & Ilmiah</div>
                                <div>Kejahatan</div>
                                <div>KDrama</div>
                                <div>Komedi</div>
                                <div>Petualangan</div>
                                <div>Perang</div>
                                <div>Romantis</div>
                            </div>
                        )}

                    </div>
                
                    <div className="b">
                        <div className="ban">Bantuan <div className="updown"onClick={() => setdropban(!drowban
                            
                        )}>{drowban ? " - " : " + "}</div></div>
                        
                        <div className="listban">
                            <div>FAQ</div>
                            <div>Kontak Kami</div>
                            <div>Privasi</div>
                            <div>Syarat & Ketentuan</div>
                        </div>
                        {drowban && (
                        <div className="listban2">
                            <div>FAQ</div>
                            <div>Kontak Kami</div>
                            <div>Privasi</div>
                            <div>Syarat & Ketentuan</div>
                        </div>
                        )}
                    </div>
            </div>
        </div>
        </footer>
    )
}

export default FooterPage