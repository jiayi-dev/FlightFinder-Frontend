import React from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelect.scss';

function DateSelect({ label, selected, onChange, minDate, disabled }) {
    return (
        <div className="date-select">
            <div className="date-select__content">
                <Calendar className="date-select__icon" />
                <div className="date-select__info">
                    <p className="date-select__label">{label}</p>
                    <DatePicker
                        selected={selected}
                        onChange={onChange}
                        minDate={minDate}
                        disabled={disabled}
                        placeholderText="Select date"
                        className="date-select__input"
                        dateFormat="MMM d, yyyy"
                    />
                </div>
            </div>
        </div>
    );
}

export default DateSelect;
