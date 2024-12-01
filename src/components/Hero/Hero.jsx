import './Hero.scss';
import airplane from '../../../public/assets/flight.webp';
import beach from "../../../public/assets/beach.mp4";
import paradise from "../../../public/assets/paradise.mp4";
import sunset from "../../../public/assets/sunset.mp4";

function Hero() {
    return (
        <div className="hero">
            <div className="hero__content">
                <h1 className="hero__title">
                    From <span className="hero__title-highlight">Here </span>
                    to <span className="hero__title-highlight">Anywhere</span>
                </h1>
                <h2 className="hero__subtitle">
                    Your Travel Starts <span className="hero__subtitle-highlight">Here!</span>
                </h2>
            </div>
            <div className="overlay-container">
                <div className="video-wrapper video-wrapper--beach">
                    <video autoPlay muted loop className="hero__overlay">
                        <source src={beach} type="video/mp4"/>
                    </video>
                </div>
                <div className="video-wrapper video-wrapper--paradise">
                    <video autoPlay muted loop className="hero__overlay">
                        <source src={paradise} type="video/mp4"/>
                    </video>
                </div>
                <div className="video-wrapper video-wrapper--sunset">
                    <video autoPlay muted loop className="hero__overlay">
                        <source src={sunset} type="video/mp4"/>
                    </video>
                </div>
            </div>
            <img className="hero__swing" src={airplane} alt="Airplane"/>
        </div>
    );
}

export default Hero;
