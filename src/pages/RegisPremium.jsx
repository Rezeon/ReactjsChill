import { useEffect, useState } from "react";
import { useDataContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/RegisPremium.css";
import BCA from "../assets/icon/BCA.png";
import PremiumFilm from "../components/molekul/PremiumFilm";

function RegisPremium() {
    const { Prem, PremSel, handleprem, setPremSel, handlePremium } = useDataContext();
    const { id } = useParams();

    const [time, setTime] = useState({
        jam: 2,
        menit: 0,
        detik: 0
    });

    const [paymentCode, setPaymentCode] = useState("");

    const adminpa = 3000

    
    useEffect(() => {
        const selectedPrem = Prem.find((p) => p.id === id);
        if (selectedPrem) {
            setPremSel(selectedPrem);
        }
    }, [id, Prem, setPremSel]);

   
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                let { jam, menit, detik } = prevTime;

                if (jam === 0 && menit === 0 && detik === 0) {
                    clearInterval(interval);
                    return prevTime; 
                } else if (detik === 0) {
                    if (menit === 0) {
                        return { jam: jam - 1, menit: 59, detik: 59 };
                    } else {
                        return { jam, menit: menit - 1, detik: 59 };
                    }
                } else {
                    return { jam, menit, detik: detik - 1 };
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    
    useEffect(() => {
        function generatePaymentCode(length = 10) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let code = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                code += chars[randomIndex];
            }
            return code;
        }
        setPaymentCode(generatePaymentCode());
    }, []);

    const today = new Date();
    const tanggal = today.getDate();
    const bulan = today.getMonth() + 1;
    const tahun = today.getFullYear();

    return (
        <div className="req">
            <div className="tm">
                <div className="ju">Lakukan Pembayaran Sebelum</div>
                <div className="wak">
                    <div className="eed">{time.jam} Jam</div> : <div className="eed">{time.menit} Menit</div> : <div className="eed">{time.detik} Detik</div>
                </div>
            </div>
            <div className="byr">
                <div className="ring">
                    Ringkasan Pembayaran
                </div>
                <div className="adc">
                    <div className="appl">
                       <PremiumFilm prem={PremSel} onPosterClick={handleprem} />
                    </div>
                    <div className="mtd">
                        <div className="mtdpbyr">
                            <div className="juw">
                                Metode Pembayaran
                            </div>
                            <div className="oay">
                                <input type="radio" name="payment" className="paymen"/>
                                <img src={BCA} alt="" />
                                <span>  Bca Virtual Account</span>
                            </div>
                        </div>
                        <div className="hap">
                            <div className="tgl">
                                <div className="tanggal">
                                    <div style={{ color: "#C1C2C4" }}> Tanggal Pembelian</div>
                                    <div>{tanggal}-{bulan}-{tahun}</div>
                                </div>
                                <div className="tanggal">
                                    <div style={{ color: "#C1C2C4" }}>Kode Pembayaran</div>
                                    <div >{paymentCode}</div>
                                </div>
                            </div>
                            <div className="ringka">
                                <div className="tran">
                                    <div className="pbyr" >
                                        Ringkasan Transaksi
                                    </div>
                                    <div className="eaa">
                                        <div className="tanggal" style={{ color: "#C1C2C4" }}>
                                            <div>Paket Premium {PremSel.jenis}</div>
                                            <div>Rp.{PremSel.price}</div>
                                        </div>
                                        <div className="tanggal" style={{ color: "#C1C2C4" }}>
                                            <div>Biaya Admin</div>
                                            <div>Rp.{adminpa}</div>
                                        </div>
                                        <div className="tanggal" style={{ color: "#C1C2C4" }}>
                                            <div>Total Pembayaran</div>
                                            <div>Rp.{(PremSel.price) + adminpa}</div>
                                        </div>
                                    </div>

                                    <div className="lam">
                                        <div className="tata">Tata Cara Pembayaran</div>
                                        <div className="cra" style={{ color: "#C1C2C4" }}>
                                            <ul>
                                                <li>Buka aplikasi BCA Mobile Banking atau akses BCA Internet Banking.</li>
                                                <li>Login ke akun Anda.</li>
                                                <li>Pilih menu "Transfer" atau "Pembayaran". </li>
                                                <li>Pilih opsi "Virtual Account" atau "Virtual Account Number". </li>
                                                <li>Masukkan nomor virtual account dan jumlah pembayaran, lalu konfirmasikan pembayaran.</li>
                                             </ul>
                                        </div>
                                    </div>
                                    <Link to="/profilsaya" className="byrr" onClick={handlePremium}>Bayar</Link>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}
export default RegisPremium;