import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RatingGraphs = ({ codeforcesData, codechefData }) => {
  const [activeTab, setActiveTab] = useState('codeforces');

  const CustomTooltip = ({ active, payload, platform }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      if (platform === 'codeforces') {
        return (
          <div className="bg-base-300 p-4 rounded-lg shadow-lg border border-primary/20">
            <p className="font-bold text-primary">{data.contestName}</p>
            <p className="text-sm">
              Rating: {data.newRating} ({data.ratingChange > 0 ? `+${data.ratingChange}` : data.ratingChange})
            </p>
            <p className="text-sm">Rank: {data.rank}</p>
            <p className="text-sm opacity-75">{data.date}</p>
          </div>
        );
      } else {
        return (
          <div className="bg-base-300 p-4 rounded-lg shadow-lg border border-primary/20">
            <p className="font-bold text-primary">{data.name}</p>
            <p className="text-sm">Rating: {data.rating}</p>
            <p className="text-sm">Rank: {data.rank}</p>
            <p className="text-sm opacity-75">
              {new Date(data.end_date).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </p>
          </div>
        );
      }
    }
    return null;
  };

  const formatCodeforcesData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((entry) => ({
      ...entry,
      date: new Date(entry.ratingUpdateTimeSeconds * 1000).toLocaleString(
        "en-IN",
        {
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        }
      ),
      ratingChange: entry.newRating - entry.oldRating,
    }));
  };

  const formatCodechefData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((entry) => ({
      ...entry,
      month: new Date(entry.end_date).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
    }));
  };

  const formattedCFData = formatCodeforcesData(codeforcesData);
  const formattedCCData = formatCodechefData(codechefData);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="tabs tabs-boxed bg-base-300 mb-6">
          <button
            className={`tab flex-1 ${activeTab === 'codeforces' ? 'tab-active bg-primary text-primary-content' : ''}`}
            onClick={() => setActiveTab('codeforces')}
          >
            Codeforces
          </button>
          <button
            className={`tab flex-1 ${activeTab === 'codechef' ? 'tab-active bg-primary text-primary-content' : ''}`}
            onClick={() => setActiveTab('codechef')}
          >
            CodeChef
          </button>
        </div>

        <div className="h-[400px]">
          {activeTab === 'codeforces' ? (
            formattedCFData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedCFData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={(props) => <CustomTooltip {...props} platform="codeforces" />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newRating"
                    name="Rating"
                    stroke="#4338ca"
                    strokeWidth={2}
                    dot={{ fill: '#4338ca', r: 4 }}
                    activeDot={{ r: 6, fill: '#f97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Codeforces contest participation data available
              </div>
            )
          ) : formattedCCData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedCCData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip content={(props) => <CustomTooltip {...props} platform="codechef" />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rating"
                  name="Rating"
                  stroke="#4338ca"
                  strokeWidth={2}
                  dot={{ fill: '#4338ca', r: 4 }}
                  activeDot={{ r: 6, fill: '#f97316' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No CodeChef contest participation data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingGraphs;