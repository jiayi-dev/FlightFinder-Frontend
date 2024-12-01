import React from 'react';
import { motion } from 'framer-motion';
import './TripTypeSwitch.scss'

const TripTypeSwitch = ({ tripTypes, selectedType, onSelect }) => {
    const getSelectedIndex = () => {
        return tripTypes.findIndex((type) => type.value === selectedType);
    };

    return (
        <div className="trip-type-switch">
            <motion.div
                className="slider"
                layout
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                }}
                style={{
                    width: `${100 / tripTypes.length}%`,
                    left: `${getSelectedIndex() * (100 / tripTypes.length)}%`,
                }}
            />
            {tripTypes.map((type) => (
                <button
                    key={type.value}
                    className={`option ${selectedType === type.value ? 'active' : ''}`}
                    onClick={() => onSelect(type.value)}
                >
                    {type.label}
                </button>
            ))}
        </div>
    );
};

export default TripTypeSwitch;
