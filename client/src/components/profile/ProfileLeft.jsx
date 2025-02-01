import { Bar } from "react-chartjs-2"
import CalendarHeatmap from "react-calendar-heatmap"
import "./heatmap.css"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import Platformcard from "./platformcard"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const logoPlatforms = {
    Leetcode: './leetcode-logo.png',
    Codeforces: './codeforces-logo.png',
    Codechef: './codechef-logo.svg',
    "Geeks for geeks": './gfg-logo.png',
};
const CodingDashboard = () => {
    // Activity data for bar chart
    const activityData = {
        labels: ["M", "T", "W", "T", "F", "Today", "S"],
        datasets: [
            {
                label: "Problems Solved",
                data: [1, 3, 4, 2, 3, 1, 0],
                backgroundColor: ["#4338ca", "#4338ca", "#4338ca", "#4338ca", "#4338ca", "#f97316", "#4338ca",],
                borderRadius: 6,
            },
        ],
    }

    // Chart options
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    // Progress data
    const topics = [
        { name: "String", value: 101, progress: 80 },
        { name: "HashMap and Set", value: 90, progress: 70 },
        { name: "Trees", value: 85, progress: 60 },
        { name: "Algorithms", value: 75, progress: 50 },
    ]

    // Generate random data for heatmap
    const today = new Date()
    const heatmapValues = []
    for (let i = 0; i < 49; i++) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        heatmapValues.push({
            date: date.toISOString(),
            count: Math.floor(Math.random() * 4),
        })
    }

    return (
        <div className="min-h-screen bg-black p-6 space-y-6 rounded-xl">
            {/* Activity Chart */}
            <div className="flex flex-row gap-4">
                <div className="card bg-base-200 shadow-xl w-4/12">
                    <div className="card-body">
                        <div className="h-full">
                            <Bar data={activityData} options={chartOptions} />
                        </div>
                        <div className="text-sm opacity-60">Arrays, String, Graphs</div>
                    </div>
                </div>

                {/* Message Banner */}
                <div className="flex flex-col gap-4 justify-center">
                    <div className="alert bg-base-200 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-12">
                                    <span className="text-2xl">😊</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold">You are doing great</h3>
                                <div className="text-sm opacity-80">
                                    Lets take a step ahead towards mastering{" "}
                                    <span className="text-warning">DP Sliding Window Bit Manipulation</span> today 🚀
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="stat bg-base-200 rounded-box">
                            <div className="stat-title">Total Questions</div>
                            <div className="stat-value">124</div>
                        </div>
                        <div className="stat bg-base-200 rounded-box">
                            <div className="stat-title">Streak</div>
                            <div className="stat-value">14</div>
                            <div className="stat-desc">days</div>
                        </div>
                        <div className="stat bg-base-200 rounded-box relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="stat-title">DSAfied Score</div>
                                <div className="stat-value text-warning">202</div>
                            </div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-warning opacity-20 rounded-bl-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Heatmap */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <CalendarHeatmap
                        values={heatmapValues}
                        classForValue={(value) => {
                            if (!value) return "color-empty"
                            return `color-scale-${value.count}`
                        }}
                        startDate={new Date("2024-01-01")}
                        endDate={new Date("2024-12-31")}
                        tooltipDataAttrs={(value) => ({
                            "data-tip": value.date ? `${value.date}: ${value.count} problems solved` : "No data",
                        })}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="basis-1/2 flex flex-row gap-4">
                    <Platformcard logo={logoPlatforms.Leetcode} problems={234} rating={1443}/>
                    <Platformcard logo={logoPlatforms.Codeforces} problems={93} rating={1176} />
                </div>
                <div className="basis-1/2 flex flex-row gap-4">
                    <Platformcard logo={logoPlatforms.Codechef} problems={157} rating={1646} />
                    <Platformcard logo={logoPlatforms["Geeks for geeks"]} problems={321} rating={1772} />
                </div>
            </div>
            {/* Progress Bars with Hover Effect */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body space-y-4">
                    {topics.map((topic, index) => (
                        <div key={index} className="group">
                            <div className="flex justify-between mb-2">
                                <span className="opacity-60 group-hover:text-primary transition-colors">{topic.name}</span>
                                <span className="group-hover:text-primary transition-colors">{topic.value}</span>
                            </div>
                            <progress
                                className="progress progress-primary w-full group-hover:bg-primary/40 transition-all"
                                value={topic.progress}
                                max="100">
                            </progress>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CodingDashboard
