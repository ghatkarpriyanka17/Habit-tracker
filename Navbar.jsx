import React from 'react';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Navbar({ theme, onToggleTheme }) {
  const now = new Date();
  const dateStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-icon">🔥</div>
        <div>
          <div className="navbar-title">Daily Habit Streak Tracker</div>
          <div className="navbar-tagline">Build discipline. One day at a time.</div>
        </div>
      </div>
      <div className="navbar-right">
        <span className="date-pill">{dateStr}</span>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          id="theme-toggle-btn"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
