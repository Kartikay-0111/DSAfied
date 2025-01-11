// utils/codeforcesUtils.js

export const fetchCodeforcesData = async (username) => {
  try {
    const response = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
    const data = await response.json();

    if (data.status === 'OK') {
      return data.result;
    } else {
      console.error('Error fetching data:', data);
      return [];
    }
  } catch (error) {
    console.error('Network error:', error);
    return [];
  }
};

export const prepareChartData = (ratingHistory, username) => ({
  title: `${username}'s Rating Progress`,
  labels: ratingHistory.map((entry) => formatDate(entry.ratingUpdateTimeSeconds)),
  datasets: [
    {
      label: 'Rating',
      data: ratingHistory.map((entry) => entry.newRating),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      tension: 0.4,
    },
  ],
});

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

// Fetch ratings and solved problems for platforms
export const fetchPlatformRatings = async (platforms) => {
  return Promise.all(
    platforms.map(async (platform) => {
      if (platform.name === 'Codeforces') {
        const data = await fetchCodeforcesData(platform.username);
        const solved = data.length;
        const rating = data.length > 0 ? data[data.length - 1].newRating : null;
        return { ...platform, rating, solved };
      }
      return platform;
    })
  );
};
