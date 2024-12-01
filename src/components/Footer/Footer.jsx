import { Link } from 'react-router-dom';
import './Footer.scss'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__column">
                        <ul className="footer__list">
                            <li><Link to="/about" className="footer__link">About FlightFinder</Link></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <ul className="footer__list">
                            <li><Link to="/how" className="footer__link">How it works</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;