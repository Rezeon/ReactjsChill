import '../assets/styles/FilmStart.css'
import Icon from '../assets/icon/information.png'
import Volum from '../assets/icon/volume.png'
import VolumOn from '../assets/icon/volumon.png'
import { useState,useEffect } from 'react';
import ReactPlayer from "react-player";
import { Link } from 'react-router-dom';

function FilmStart({Film,setPop,onImageClick,Trailer}) {
    const [FilmTrailer, setFilmTrailer] = useState(null);
    const [VolumF, setVolum] = useState(false)


    useEffect(() => {
        if (Film && Film.movie) {
            const trailerUrl = Trailer[Film.movie];
            setFilmTrailer(trailerUrl || null);
        }
    }, [Film, Trailer]);


    if (!Film) {
        return <div className='beranda'>
            <div className="desk">
                <div className="infofilm">
                    <p className="judulfilm">Silakan Pilih 1 film</p>
                </div>
            </div>
        </div>;

    }


    return (
        <>
        <div className="beranda">
        <div className="berandawrapper">
        {FilmTrailer ? (
                        <ReactPlayer
                            url={FilmTrailer}
                            playing={true} 
                            muted={VolumF}
                            width="130vw"
                            height="130vh"
                            className="berandimg"
                        />
                    ) : (
                        <img
                            src={Film?.img2}
                            alt=""
                            className="berandimg"
                        />
                    )}

        </div>
            <div className="desk">
                <div className="infofilm">
                    <p className="judulfilm">{Film.movie}</p>
                    <p className="deskripsi">{Film.description.length > 200 
                                            ? Film.description.slice(0, 200) + "..." 
                                            : Film.description}
                    </p>
                </div>
                <div className="iconfilm">
                    <div className="a">
                        <Link to="/videoplay" className="mulai">Mulai</Link>
                        <div href="www" className="selengkap" onClick={() => {setPop(true); onImageClick(Film.id);}}> <img src={Icon} alt="" /> Selengkapnya</div>
                        <p className="rateinfo"> {Film.age_rating} </p>
                    </div>
                    <button className="suara" onClick={() => setVolum(!VolumF)}>
                        <img src={VolumF ? Volum : VolumOn}  alt="" className='volum' />
                    </button>

                </div>
            </div>
        </div>
        </>
    )
}

export default FilmStart;