import "../../assets/styles/PremiumFilm.css"
import { useNavigate } from "react-router-dom";

function PremiumFilm({prem,onPosterClick}) {
    const navigate = useNavigate();

    if (!prem || !prem.features) {
        return <div>Loading...</div>; 
    }

    const handleSubscription = () => {
        navigate(`/regispremium/${prem.id}`); 
    };
    

    return (
        <div className="cov" >
            <div className="jns">
                <div className="klg">{prem.jenis}</div>
                <div className="hrg">Mulai dari Rp {prem.price}/bulan <br />{prem.accounts}</div>
                <div className="pilihan">
                {prem.features.map((f, index) => (
                        <div key={index}>✔ {f}</div>
                    ))}
                </div>
            </div>
            <div className="tmbl" onClick={handleSubscription}>
                <div className="langgan">Langganan</div>
                <div className="syrt">Syarat dan ketentuan Berlaku</div>
            </div>
        </div>
    )
}

export default PremiumFilm;