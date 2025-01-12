import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const RatingChart = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Chart configuration
        const config = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: chartData.title || 'Rating Progress'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: chartData.xAxisTitle || 'Contest Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: chartData.yAxisTitle || 'Rating'
                        },
                        beginAtZero: false
                    }
                }
            }
        };

        const ratingChart = new Chart(ctx, config);

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            ratingChart.destroy();
        };
    }, [chartData]); // Dependency on chartData, updates the chart when data changes

    return (
        <div>
            <h2>{chartData.title || 'Rating Chart'}</h2>
            <canvas ref={chartRef} width="800" height="400"></canvas>
        </div>
    );
};

export default RatingChart;