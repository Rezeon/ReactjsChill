import Volum from '../../assets/icon/volume.png'
import { useDataContext } from '../../context/UserContext';
import '../../assets/styles/PopupFilm.css'
import { Link } from 'react-router-dom';

function PopupFilm({onClose,Film}) {
    const { favoriteFilms, addFavoriteFilm, removeFavoriteFilm } = useDataContext();

    return (
        <div className="allma">
            <div className="kkl">
                <div className="img33">
                    <div className="silang" onClick={onClose}>X</div>
                    <div className="imgg2">
                        <img src={Film.img2} alt="" className='imgg4'/>
                    </div>
                    <div className="tombol22">
                        <div className="namefilm">
                        {Film.movie}
                        </div>
                        <div className="mulai11">
                            <div className="merg11">
                                <div className="mulai">
                                    <Link to="/videoplay" className="mulai">Mulai</Link>
                                </div>
                                {favoriteFilms.includes(Film.id) ? (
                                        <button onClick={() => removeFavoriteFilm(Film.id)} className="rateinfo">✔</button>
                                    ) : (
                                        <button onClick={() => addFavoriteFilm(Film.id)} className="rateinfo">+</button>
                                    )}
                                    
                                    
                            </div>
                            <button className="suara"><img src={Volum} alt="" className='volum' /></button>
                        </div>
                    </div>
                </div>
                <div className="infomov">
                    <div className="aff">
                        <div className="rateinfo">
                            {Film.age_rating}
                        </div>
                        <div className="infomov2">{Film.description}</div>
                    </div>
                    <div className="app">
                        <div className="cast">
                            <div className='qwew'>Cast:</div>
                            <div className='qqqpp'>
                                {Film.cast.map((cast, index) => (
                                        <div key={index}>
                                        {cast},
                                        </div>
                                ))}
                            </div>
                        </div>
                        <div className="cast">
                            <div className='qwew'>Genre:</div>
                            <div className='qqqpp'>
                                {Film.genre.map((genre, index) => (
                                        <div key={index} >-{genre}</div>
                                ))}
                            </div>
                        </div>
                        <div className="cast" >
                            <div className='qwew'>Pembuat Film:</div>
                            <div>{Film.director}</div>
                        </div>
                        <div className="cast" >
                            <div className='qwew'>Episode:</div>
                            <div>{Film.episodes ? Film.episodes : "Movie"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopupFilm;