import './About.scss';

function About() {
    return (
        <section className="about-section">
            <div className="about-container">
                <h2 className="about-title">About Us</h2>
                <p className="about-description">
                    In today's fast-paced world, finding affordable flight tickets has become an essential part of many people's travel plans.
                    However, traditional flight search methods can be time-consuming, and unfortunately, there are many unreliable ticket agents
                    and misleading websites that prey on unsuspecting travelers—especially students studying abroad. Having personally experienced
                    these frustrations, we understand the pain points firsthand.
                </p>
                <p className="about-description">
                    That's why we created <strong>Flight Finder</strong>, a flight search platform designed specifically for international
                    students and travelers. Our mission is to provide a more efficient, reliable, and secure way to book flights, helping you find
                    the best deals without the risk of falling into scams or wasting time on unreliable sources.
                </p>
                <p className="about-description">
                    With <strong>Flight Finder</strong>, you can easily compare prices from major airlines and trusted ticket agents, ensuring
                    that you get the most affordable options available. We use advanced search technology to bring you accurate and up-to-date
                    pricing information, while also filtering out unreliable sources. Our goal is to make sure you can travel with peace of mind,
                    knowing that your flight booking is safe and reliable.
                </p>
            </div>
        </section>
    );
}

export default About;
