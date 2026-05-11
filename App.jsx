import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HabitInput from './components/HabitInput';
import HabitList from './components/HabitList';
import './index.css';

/* ── Motivational quotes ────────────────────────────────────────── */
const QUOTES = [
  { text: "Consistency is the key to achieving and maintaining momentum.", emoji: "🚀" },
  { text: "You don't have to be great to start, but you have to start to be great.", emoji: "⚡" },
  { text: "Small daily improvements lead to staggering long-term results.", emoji: "📈" },
  { text: "Discipline is choosing between what you want now and what you want most.", emoji: "🎯" },
  { text: "The secret to getting ahead is getting started. Keep going!", emoji: "💪" },
  { text: "Every streak begins with a single check. Make it count.", emoji: "🔥" },
];

/* ── Weekly activity log helpers ───────────────────────────────── */
const ACTIVITY_KEY = 'dhst_activity_v1';
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* Today's date */
function todayKey() {
  const d = new Date();

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

/* Load activity */
function loadActivity() {
  try {
    return JSON.parse(
      localStorage.getItem(ACTIVITY_KEY)
    ) || {};
  } catch (_) {
    return {};
  }
}

/* Save activity */
function saveActivity(map) {
  localStorage.setItem(
    ACTIVITY_KEY,
    JSON.stringify(map)
  );
}

/* Heatmap */
function buildHeatmap(activityMap) {

  const now = new Date();
  const todayDow = now.getDay();

  const sunday = new Date(now);

  sunday.setDate(
    now.getDate() - todayDow
  );

  return DAYS_SHORT.map((label, i) => {

    const day = new Date(sunday);

    day.setDate(
      sunday.getDate() + i
    );

    const key = `${day.getFullYear()}-${String(
      day.getMonth() + 1
    ).padStart(2, '0')}-${String(
      day.getDate()
    ).padStart(2, '0')}`;

    return {
      label,
      key,
      active: !!activityMap[key],
      today: i === todayDow,
      future: i > todayDow,
    };
  });
}

/* ── Storage ───────────────────────── */
const STORAGE_KEY = 'dhst_habits_v2';

/* Default habits */
const DEFAULT_HABITS = [
  {
    id: 1,
    name: 'Drink 8 glasses of water 💧',
    completed: false,
    streak: 3,
  },
  {
    id: 2,
    name: 'Exercise for 30 minutes 🏋️',
    completed: true,
    streak: 7,
  },
  {
    id: 3,
    name: 'Read for 20 minutes 📚',
    completed: false,
    streak: 2,
  },
  {
    id: 4,
    name: 'Meditate & breathe 🧘',
    completed: false,
    streak: 1,
  },
];

/* Load habits */
function loadHabits() {
  try {

    const raw = localStorage.getItem(
      STORAGE_KEY
    );

    if (raw) {
      return JSON.parse(raw);
    }

  } catch (_) { }

  return DEFAULT_HABITS;
}

/* ── App ───────────────────────────── */
export default function App() {

  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem('dhst_theme')
      || 'light'
    );
  });

  const [habits, setHabits] =
    useState(loadHabits);

  const [quoteIndex, setQuoteIndex] =
    useState(0);

  const [activityMap, setActivityMap] =
    useState(loadActivity);

  const [selectedDay, setSelectedDay] =
    useState(null);

  const [nextId, setNextId] = useState(() => {
    const h = loadHabits();

    return h.length
      ? Math.max(...h.map(x => x.id)) + 1
      : 5;
  });

  const heatmap =
    buildHeatmap(activityMap);

  /* Theme */
  useEffect(() => {

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    localStorage.setItem(
      'dhst_theme',
      theme
    );

  }, [theme]);

  /* Save habits */
  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(habits)
    );

  }, [habits]);

  /* Save activity */
  useEffect(() => {

    saveActivity(activityMap);

  }, [activityMap]);

  /* Rotate quotes */
  useEffect(() => {

    const t = setInterval(() => {

      setQuoteIndex(i =>
        (i + 1) % QUOTES.length
      );

    }, 8000);

    return () => clearInterval(t);

  }, []);

  /* Add habit */
  const handleAdd = (name) => {

    setHabits(prev => [
      ...prev,
      {
        id: nextId,
        name,
        completed: false,
        streak: 0,
      },
    ]);

    setNextId(n => n + 1);
  };

  /* Toggle habit */
  const handleToggle = (id) => {

    setHabits(prev => {

      const updated = prev.map(h => {

        if (h.id !== id) return h;

        const nowCompleted =
          !h.completed;

        return {
          ...h,
          completed: nowCompleted,

          streak: nowCompleted
            ? h.streak + 1
            : Math.max(
              0,
              h.streak - 1
            ),
        };
      });

      const anyDone =
        updated.some(h => h.completed);

      setActivityMap(prev => {

        const next = { ...prev };

        if (anyDone) {
          next[todayKey()] = true;
        } else {
          delete next[todayKey()];
        }

        return next;
      });

      return updated;
    });
  };

  /* Delete habit */
  const handleDelete = (id) => {

    setHabits(prev =>
      prev.filter(h => h.id !== id)
    );
  };

  /* Stats */
  const totalHabits =
    habits.length;

  const completedToday =
    habits.filter(h => h.completed)
      .length;

  const highestStreak =
    habits.length
      ? Math.max(
        ...habits.map(h => h.streak)
      )
      : 0;

  const completion =
    totalHabits
      ? Math.round(
        (completedToday / totalHabits) * 100
      )
      : 0;

  const quote =
    QUOTES[quoteIndex];

  return (

    <div className="app-shell">

      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme(t =>
            t === 'dark'
              ? 'light'
              : 'dark'
          )
        }
      />

      <main className="dashboard">

        {/* LEFT PANEL */}
        <div className="left-panel">

          <HabitInput
            onAdd={handleAdd}
          />

          <HabitList
            habits={habits}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />

        </div>

        {/* RIGHT PANEL */}
        <aside className="right-panel progress-panel">

          {/* STATS */}
          <div className="panel-card">

            <div
              className="section-header"
              style={{
                marginBottom: 16
              }}
            >

              <span className="section-title">
                Today's Progress
              </span>

            </div>

            <div className="stats-grid">

              <div
                className="stat-card"
                data-emoji="📋"
              >
                <span className="stat-label">
                  Total
                </span>

                <span className="stat-value">
                  {totalHabits}
                </span>
              </div>

              <div
                className="stat-card accent-card"
                data-emoji="✅"
              >
                <span className="stat-label">
                  Done
                </span>

                <span className="stat-value">
                  {completedToday}
                </span>
              </div>

              <div
                className="stat-card streak-card"
                data-emoji="🔥"
              >
                <span className="stat-label">
                  Best Streak
                </span>

                <span className="stat-value">
                  {highestStreak}
                </span>
              </div>

              <div
                className="stat-card"
                data-emoji="📊"
              >
                <span className="stat-label">
                  Rate
                </span>

                <span className="stat-value">
                  {completion}%
                </span>
              </div>

            </div>

            {/* PROGRESS BAR */}
            <div
              className="progress-bar-wrap"
              style={{
                marginTop: 20
              }}
            >

              <div className="progress-bar-label">

                <span>
                  Daily completion
                </span>

                <span
                  style={{
                    color: 'var(--accent)',
                    fontWeight: 700
                  }}
                >
                  {completion}%
                </span>

              </div>

              <div className="progress-bar-track">

                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${completion}%`
                  }}
                />

              </div>

            </div>

          </div>

          {/* WEEKLY HEATMAP */}
          <div className="panel-card">

            <div className="heatmap-wrap">

              <span className="heatmap-label">
                This Week
              </span>

              <div className="heatmap-grid">

                {heatmap.map((day, i) => (

                  <div
                    key={i}
                    className="heatmap-day"
                  >

                    <div
                      onClick={() =>
                        setSelectedDay(day)
                      }

                      className={`heatmap-dot${day.active
                          ? ' active'
                          : ''
                        }${day.today
                          ? ' today'
                          : ''
                        }`}

                      style={{
                        cursor: 'pointer'
                      }}
                    />

                    <span className="heatmap-day-name">
                      {day.label}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* SELECTED DAY */}
          {selectedDay && (

            <div className="panel-card">

              <div
                className="section-header"
                style={{
                  marginBottom: 16
                }}
              >

                <span className="section-title">
                  {selectedDay.label} Activity
                </span>

              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >

                {habits.map(habit => (

                  <div
                    key={habit.id}

                    style={{
                      background:
                        habit.completed
                          ? 'rgba(34,197,94,0.15)'
                          : 'rgba(255,255,255,0.04)',

                      border:
                        '1px solid rgba(255,255,255,0.08)',

                      padding: '12px',
                      borderRadius: '14px',
                      color: 'white',
                    }}
                  >

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >

                      <span>
                        {habit.name}
                      </span>

                      <span>
                        {habit.completed
                          ? '✅ Done'
                          : '❌ Missed'}
                      </span>

                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        color: '#22c55e',
                        fontWeight: 700,
                      }}
                    >
                      🔥 Streak:
                      {' '}
                      {habit.streak}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* QUOTE */}
          <div className="quote-card">

            <span className="quote-emoji">
              {quote.emoji}
            </span>

            <p className="quote-text">
              {quote.text}
            </p>

          </div>

        </aside>

      </main>

    </div>
  );
}