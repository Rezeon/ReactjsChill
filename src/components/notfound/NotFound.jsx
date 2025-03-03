import NotFound1 from '../../assets/images/404.png';
import '../../assets/styles/NotFound.css'
import { Link } from 'react-router-dom';
function NotFound () {
    return (
        <div className="halnot">
            <div className="hallool">
                <div>
                We Lost in Space 404..... 
                </div>
                <img src={NotFound1} alt="" className='gambarttf' />
                <Link to='/' >Back To Earth</Link>
            </div>
        </div>
    );
}

export default NotFound;