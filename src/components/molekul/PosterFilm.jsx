import Down from "../../assets/icon/down.png"
import Play from "../../assets/icon/play.png"
import { useDataContext } from '../../context/UserContext';
import { Link } from "react-router-dom";
import "../../assets/styles/PosterFilm.css"
function PosterFilm({film,onImageClick}) {
    const { favoriteFilms, addFavoriteFilm, removeFavoriteFilm } = useDataContext();
    return (
        <div className="lis1" onClick={() => onImageClick(film.id)} >
                    <img src={film.img} alt={''} className="img1"/>
                    <div className="series" >
                        <div className="img11">
                            <img src={film.img2} alt="" className="img2"/>
                        </div>
                        <div className="op">
                            <div className="cek">
                                <div className="play">
                                    <Link onClick={() => onImageClick(film.id)}  to="/videoplay" className="mulai"><img src={Play} alt="" /></Link>
                                </div>
                                <div className="cen">
                                    <img src={Down} alt="" />
                                </div>
                            </div>
                            {favoriteFilms.includes(film.id) ? (
                                        <button onClick={() => removeFavoriteFilm(film.id)} className="rateinfo">✔</button>
                                    ) : (
                                        <button onClick={() => addFavoriteFilm(film.id)} className="rateinfo">+</button>
                                    )}
                        </div>
                        <div className="rat">
                            <div className="rati">{film.age_rating}</div>
                            <div>{film.episodes ? film.episodes : "Movie"} eps</div>
                        </div>
                        <div className="genre">
                            {film.genre.flat().map((genre, index) => (
                                <div key={index}>{genre}</div>
                            ))}
                        </div>
                    </div>

                </div>
    )
}

export default PosterFilm;