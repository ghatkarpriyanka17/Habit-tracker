import React, { useState } from 'react';
import StreakBadge from './StreakBadge';

export default function HabitItem({ habit, onToggle, onDelete }) {
    const [removing, setRemoving] = useState(false);

    const handleDelete = () => {
        setRemoving(true);
        setTimeout(() => onDelete(habit.id), 240);
    };

    return (
        <div
            id={`habit-${habit.id}`}
            className={`habit-item${habit.completed ? ' completed' : ''}${removing ? ' removing' : ''}`}
            onClick={() => onToggle(habit.id)}
        >
            {/* Checkbox */}
            <div className={`custom-checkbox${habit.completed ? ' checked' : ''}`}>
                <span className="check-mark">✓</span>
            </div>

            {/* Habit name */}
            <span className="habit-name">{habit.name}</span>

            {/* Streak */}
            <StreakBadge streak={habit.streak} />

            {/* Delete */}
            <button
                id={`delete-${habit.id}`}
                className="delete-btn"
                onClick={e => { e.stopPropagation(); handleDelete(); }}
                aria-label={`Delete ${habit.name}`}
            >
                ✕
            </button>
        </div>
    );
}
