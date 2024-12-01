import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './TravelersSelect.scss';

function TravelersSelect({ travelers, setTravelers, onClose, updateTravelerCount }) {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="travelers__dropdown">
            <div className="travelers__category">
                <div>
                    <p className="travelers__type-label">Adults</p>
                    <p className="travelers__type-desc">Age 16+</p>
                </div>
                <div className="travelers__controls">
                    <button
                        onClick={(e) => {
                            handleClick(e);
                            updateTravelerCount('adults', travelers.adults - 1);
                        }}
                        className="travelers__button"
                        disabled={travelers.adults <= 0}
                    >
                        <ChevronDown className="travelers__icon"/>
                    </button>
                    <span className="travelers__count">{travelers.adults}</span>
                    <button
                        onClick={(e) => {
                            handleClick(e);
                            updateTravelerCount('adults', travelers.adults + 1);
                        }}
                        className="travelers__button"
                        disabled={travelers.adults >= 9}
                    >
                        <ChevronUp className="travelers__icon"/>
                    </button>
                </div>
            </div>

            <div className="travelers__category">
                <div>
                    <p className="travelers__type-label">Youth</p>
                    <p className="travelers__type-desc">Ages 12-15</p>
                </div>
                <div className="travelers__controls">
                    <button
                        onClick={(e) => {
                            handleClick(e);
                            updateTravelerCount('youth', travelers.youth - 1);
                        }}
                        className="travelers__button"
                        disabled={travelers.youth <= 0}
                    >
                        <ChevronDown className="travelers__icon"/>
                    </button>
                    <span className="travelers__count">{travelers.youth}</span>
                    <button
                        onClick={(e) => {
                            handleClick(e);
                            updateTravelerCount('youth', travelers.youth + 1);
                        }}
                        className="travelers__button"
                        disabled={travelers.youth >= 9}
                    >
                        <ChevronUp className="travelers__icon"/>
                    </button>
                </div>
            </div>

            <div className="travelers__category">
                <div>
                    <p className="travelers__type-label">Children</p>
                    <p className="travelers__type-desc">Ages 2-12</p>
                </div>
                <div className="travelers__controls">
                    <button
                        onClick={(e) => {
                            handleClick(e);
                            updateTravelerCount('children', travelers.children - 1);
                        }}
                        className="travelers__button"
                        disabled={travelers.children <= 0}
                    >
                        <ChevronDown className="travelers__icon"/>
                    </button>
                    <span className="travelers__count">{travelers.children}</span>
                    <button
                        onClick={(e) => {
                            handleClick(e);
                            updateTravelerCount('children', travelers.children + 1);
                        }}
                        className="travelers__button"
                        disabled={travelers.children >= 9}
                    >
                        <ChevronUp className="travelers__icon"/>
                    </button>
                </div>
            </div>

            <button
                onClick={onClose}
                className="travelers__done"
            >
                Done
            </button>
        </div>
    );
}

export default TravelersSelect;
