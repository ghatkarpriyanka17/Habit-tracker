import React from 'react';
import HabitItem from './HabitItem';

export default function HabitList({ habits, onToggle, onDelete }) {
    return (
        <div className="panel-card" style={{ flex: 1 }}>
            <div className="section-header">
                <span className="section-title">Today's Habits</span>
                <span className="habit-count-badge">{habits.length} habits</span>
            </div>

            <div className="habit-list" style={{ marginTop: 16 }}>
                {habits.length === 0 ? (
                    <div className="habit-list-empty">
                        <span className="empty-icon">🌱</span>
                        No habits yet. Add your first one above!
                    </div>
                ) : (
                    habits.map(habit => (
                        <HabitItem
                            key={habit.id}
                            habit={habit}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
