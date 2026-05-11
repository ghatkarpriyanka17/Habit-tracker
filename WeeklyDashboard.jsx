import React from "react";

const weeklyData = [
    { day: "Sun", completed: 1 },
    { day: "Mon", completed: 2 },
    { day: "Tue", completed: 3 },
    { day: "Wed", completed: 1 },
    { day: "Thu", completed: 4 },
    { day: "Fri", completed: 5 },
    { day: "Sat", completed: 2 },
];

const WeeklyDashboard = () => {
    return (
        <div className="bg-[#111827] border border-[#2a2f45] rounded-3xl p-6 mt-6">

            <h2 className="text-2xl font-bold text-white mb-6">
                Weekly Dashboard
            </h2>

            <div className="grid grid-cols-7 gap-4 items-end h-52">

                {weeklyData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">

                        <div
                            className="w-10 rounded-xl bg-green-400 transition-all duration-300"
                            style={{
                                height: `${item.completed * 30}px`,
                            }}
                        ></div>

                        <p className="text-gray-400 mt-2 text-sm">
                            {item.day}
                        </p>

                    </div>
                ))}

            </div>

            <div className="mt-6 text-gray-300 space-y-2">
                <p>🔥 Total Weekly Streak: 18</p>
                <p>✅ Completed Habits: 18</p>
                <p>📈 Weekly Progress: 75%</p>
            </div>

        </div>
    );
};

export default WeeklyDashboard;