import './Home.scss';
import Hero from '../../components/Hero/Hero.jsx';
import SearchForm from "../../components/SearchForm/SearchForm.jsx";

const Home = () => {
    return (
        <div className="Home">
            <SearchForm />
            <Hero />
        </div>
    );
};

export default Home;
