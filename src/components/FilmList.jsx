import { useRef } from "react";
import "../assets/styles/FilmList.css"
import PosterFilm from "./molekul/PosterFilm";

function FilmList({Film,judul,onImageClick}) {
    const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
    return (
        <>
        <div className="to">
            <p className="ju4">{judul}</p>
            <button onClick={scrollLeft} className="btnl">⬅</button>
            <div className="lis" ref={scrollRef}> 
                {Film.map((film) => 
                <PosterFilm film={film} onImageClick={onImageClick} />
                )}
            </div>
            <button onClick={scrollRight} className="btnr">➡</button>
        </div>
        </>
    )
}

export default FilmList;