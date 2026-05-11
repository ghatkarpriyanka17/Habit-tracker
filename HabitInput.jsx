import React, { useState } from 'react';

export default function HabitInput({ onAdd }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setValue('');
    };

    return (
        <div className="panel-card input-section">
            <span className="input-label">＋ New Habit</span>
            <form className="input-row" onSubmit={handleSubmit}>
                <input
                    id="habit-input-field"
                    className="habit-input"
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Enter a new habit…"
                    maxLength={60}
                    autoComplete="off"
                />
                <button
                    id="add-habit-btn"
                    className="add-btn"
                    type="submit"
                >
                    <span className="btn-icon">+</span>
                    Add Habit
                </button>
            </form>
        </div>
    );
}
