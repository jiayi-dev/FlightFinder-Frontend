import { motion } from 'framer-motion';
import './How.scss'

const How = () => {
    const features = [
        {
            title: "Real-Time Price Comparison",
            description: "Intelligently compares prices from multiple airlines and booking platforms to ensure you get the best fare."
        },

        {
            title: "Flexible Date Search",
            description: "Find more affordable flight options by searching for nearby dates."
        }
    ];

    const benefits = [
        {
            title: "Save Time",
            description: "No need to manually compare multiple websites; one-stop search for all available flights."
        },
        {
            title: "Save Money",
            description: "On average, saves users 20-30% on flight expenses."
        },
        {
            title: "Convenient Operation",
            description: "Simple and intuitive interface design for easy flight search and booking."
        }
    ];

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const slideInFromLeft = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.div
            className="how-container"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
        >
            <header className="header">
                <motion.header
                    className="how-header"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h1 className="how-title" variants={fadeIn} transition={{ delay: 0.4 }}>
                        Smart Low-Cost Flight Search
                    </motion.h1>
                    <motion.p className="how-subtitle" variants={fadeIn} transition={{ delay: 0.6 }}>
                        Find the best flight prices for you, making travel easier and more affordable.
                    </motion.p>
                </motion.header>
            </header>

            <section className="how-section">
                <motion.h2
                    className="section-title"
                    variants={slideInFromLeft}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                >
                    Core Features
                </motion.h2>
                <motion.div
                    className="features-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-item"
                            variants={fadeIn}
                            whileHover={{ scale: 1.03 }}
                        >
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section className="how-section">
                <motion.h2
                    className="section-title"
                    variants={slideInFromLeft}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                >
                    Product Advantages
                </motion.h2>
                <motion.div className="benefits-container">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="benefit-item"
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="benefit-title">{benefit.title}</h3>
                            <p className="benefit-description">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </motion.div>
    );
};

export default How;
