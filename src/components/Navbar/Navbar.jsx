import { Link } from 'react-router-dom';
import  './Navbar.scss'

function Navbar() {
    return (
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__content">
                    <div className="nav__left">
                        <Link to="/" className="nav__logo">
                            <span className="nav__logo-text">Flight Finder️</span>
                        </Link>
                    </div>
                    <div className="nav__right">
                        <Link to="/" className="nav__link">Home</Link>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;