import React from 'react';
import './SearchFilters.scss'

const SearchFilters = ({ priority, setPriority, isFlexible, setIsFlexible }) => {
    return (
        <div className="search-results__filter">
            <div className="search-filters__group">
                <label htmlFor="priority" className="search-filters__label">
                    Sort by:
                </label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="search-filters__select"
                >
                    <option value="price">Recommended</option>
                    <option value="duration">Duration</option>
                </select>
            </div>

            <div className="search-filters__group">
                <label className="search-filters__checkbox">
                    <input
                        type="checkbox"
                        checked={isFlexible}
                        onChange={(e) => setIsFlexible(e.target.checked)}
                    />
                    My dates are flexible
                </label>
            </div>
        </div>
    );
};

export default SearchFilters;