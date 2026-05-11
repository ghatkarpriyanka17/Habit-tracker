import React, { useState } from 'react';

export default function StreakBadge({ streak }) {
    const [pop, setPop] = useState(false);

    // Trigger pop animation whenever streak updates
    React.useEffect(() => {
        if (streak > 0) {
            setPop(true);
            const t = setTimeout(() => setPop(false), 420);
            return () => clearTimeout(t);
        }
    }, [streak]);

    const isHigh = streak >= 5;

    return (
        <span className={`streak-badge${pop ? ' pop' : ''}${isHigh ? ' high' : ''}`}>
            <span className="streak-flame">🔥</span>
            <span className="streak-num">{streak}</span>
        </span>
    );
}
