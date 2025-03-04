
import "../assets/styles/ContinueWatch.css"

function ContinueWatch({Film,judul,onImageClick}) {
    return (
        <>
        <div className="top">
            <p className="judul">{judul}</p>
            <div className="list">
                {Film.map((film, index) => 
                <div className="list1" key={index} onClick={() => onImageClick(film.id)} >
                    <img src={`${process.env.PUBLIC_URL}${film.img2}`} alt={''}/>
                    <div className="info">
                    <p className="p1">{film.movie}</p><p className="p2">{film.rating}/5</p>
                    </div>
                </div>
                )}
            </div>
        </div>
        </>
    )
}

export default ContinueWatch;