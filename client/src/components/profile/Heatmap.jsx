import React, { useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // Default styles
import "./heatmap.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip } from "react-tooltip";

const Heatmap = ({ data = {} }) => {
    // console.log(data);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Extract available years from data
    const availableYears = useMemo(() => {
        if (!data || Object.keys(data).length === 0) return [currentYear];

        const years = new Set(Object.keys(data).map((date) => parseInt(date.split("-")[0])));
        return Array.from(years).sort((a, b) => b - a);
    }, [data]);

    // Transform data into heatmap format
    const heatmapValues = useMemo(() => {
        if (!data || Object.keys(data).length === 0) return [];

        const values = [];
        const startDate = new Date(`${selectedYear}-01-01`);
        const endDate = new Date(`${selectedYear}-12-31`);
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split("T")[0];
            values.push({
                date: dateStr,
                count: data?.[dateStr] ?? 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return values;
    }, [data, selectedYear]);

    // Calculate stats
    const stats = useMemo(() => {
        const totalSubs = heatmapValues.reduce((sum, day) => sum + day.count, 0);
        let streak = 0, maxStreak = 0, activeDays = 0;

        heatmapValues.forEach((day) => {
            if (day.count > 0) {
                streak++;
                activeDays++;
                maxStreak = Math.max(maxStreak, streak);
            } else {
                streak = 0;
            }
        });

        return {
            totalSubmissions: totalSubs,
            maxStreak,
            activeDays,
            avgPerDay: (totalSubs / heatmapValues.length).toFixed(1)
        };
    }, [heatmapValues]);

    // Color intensity mapping
    const getColorClass = (count) => {
        if (count === 0) return "color-empty";
        if (count <= 3) return "color-scale-1";
        if (count <= 6) return "color-scale-2";
        if (count <= 9) return "color-scale-3";
        return "color-scale-4";
    };

    return (
        <div className="card bg-gray-900 shadow-xl p-6 rounded-xl w-full text-white">
            <div className="flex justify-between items-center mb-4">
                <motion.div
                    className="text-lg font-semibold flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-primary">🔥 {stats.totalSubmissions}</span> submissions in {selectedYear}
                </motion.div>
                <div className="flex gap-2">
                    <motion.button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedYear((y) => Math.max(y - 1, availableYears.at(-1)))}
                        disabled={selectedYear === availableYears.at(-1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft size={16} /> Prev
                    </motion.button>
                    <motion.button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedYear((y) => Math.min(y + 1, availableYears[0]))}
                        disabled={selectedYear === availableYears[0]}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Next <ChevronRight size={16} />
                    </motion.button>
                </div>
            </div>

            {/* Heatmap */}
            <div className="overflow-x-auto pb-4">
        <CalendarHeatmap
          values={heatmapValues}
          classForValue={(value) => getColorClass(value?.count)}
          startDate={new Date(`${selectedYear}-01-01`)}
          endDate={new Date(`${selectedYear}-12-31`)}
          showMonthLabels
          showWeekdayLabels
          gutterSize={4}
          tooltipDataAttrs={(value) => ({
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": value?.date
              ? `${new Date(value.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}: ${value.count} submissions`
              : "No submissions",
          })}
        />
        <Tooltip id="heatmap-tooltip" place="top" effect="solid" className="tooltip-custom" />
      </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "📅 Active Days", value: stats.activeDays, color: "text-green-400" },
                    { label: "🔥 Max Streak", value: `${stats.maxStreak} days`, color: "text-red-400" },
                    { label: "📆 Total Days", value: heatmapValues.length, color: "text-blue-400" },
                    { label: "📊 Avg per Day", value: stats.avgPerDay, color: "text-yellow-400" },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className={`bg-gray-800/50 p-3 rounded-lg ${stat.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="text-sm opacity-70">{stat.label}</div>
                        <div className="text-lg font-semibold">{stat.value}</div>
                    </motion.div>
                ))}
            </div>
            
        </div>
    );
};

export default Heatmap;
