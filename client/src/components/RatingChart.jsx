import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const RatingChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Sample data for Codeforces and LeetCode ratings
        const ratingData = {
            labels: ['Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023'], // Contest dates
            datasets: [
                {
                    label: 'Codeforces Rating',
                    data: [1200, 1350, 1450, 1500, 1600, 1700], // Codeforces ratings over time
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4 // Smooth line
                },
                {
                    label: 'LeetCode Rating',
                    data: [800, 1000, 1100, 1200, 1300, 1400], // LeetCode ratings over time
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.4 // Smooth line
                }
            ]
        };

        // Chart configuration
        const config = {
            type: 'line',
            data: ratingData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Codeforces and LeetCode Rating Progress'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Contest Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Rating'
                        },
                        beginAtZero: false
                    }
                }
            }
        };

        const ratingChart = new Chart(ctx, config);

        // Cleanup function
        return () => {
            ratingChart.destroy();
        };
    }, []);

    return (
        <div>
            <h2>Codeforces and LeetCode Rating Chart</h2>
            <canvas ref={chartRef} width="800" height="400"></canvas>
        </div>
    );
};

export default RatingChart;
