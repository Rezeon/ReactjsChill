import "../assets/styles/DaftarFilm.css"
import { useDataContext } from "../context/UserContext.js";


function DaftarFilm({filter}) {
    const {Post, favoriteFilms} = useDataContext();

    const films = Post.filter(film => {
        if (filter === "Daftar Saya") return favoriteFilms.includes(film.id);
        if (filter === "Film") return film.episodes < 2;
        if (filter === "Series") return film.episodes > 1;
        return true;
    });
    return (
        <div className="daftarfilm">
            <div className="judul">{filter}</div>
            <div className="filmsaya">
                {films.map((film,index)=>
                <div key={index} >
                    <img src={film.img} alt="" className="lis1" />
                </div>
                )}
            </div>
        </div>
    )
}
export default DaftarFilm;