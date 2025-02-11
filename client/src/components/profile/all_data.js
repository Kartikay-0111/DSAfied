import axios from 'axios';

const LCquery = {
    "query": `query userProfileCalendar($username: String!, $year: Int) {
 matchedUser(username: $username) {
  userCalendar(year: $year) {
    activeYears
    streak
    totalActiveDays
    dccBadges {
      timestamp badge {
        name
        icon
      }
    }
    submissionCalendar
  }
}
}
`,
    "variables": {
        "username": "kartikay7905"
    }
}
const fetchCodeforcesData = async (username) => {
    const url = `https://codeforces.com/api/user.status?handle=${username}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching Codeforces data:", error);
        return null;
    }
};

const fetchCodeChefData = async (username) => {
    const url = `https://codechef-api.vercel.app/handle/${username}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching CodeChef data:", error);
        return null;
    }
};

export const fetchLeetCodeData = async () => {
    try {
      const res = await fetch(`/api/profile/lc/${LCquery.variables.username}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LCquery),
      })
  
      if(!res.ok){
        throw new Error('Leetcode API res was not ok')
      }
  
      const data = await res.json()
      return data;
    } catch (error) {
      console.log('Error fetching leetcode profile data: ', error);
      throw error
    }
  }

const mergeCPData = async (codeforcesUsername, codechefUsername, leetcodeUsername) => {
    const [codeforcesData, codechefData, leetcodeData] = await Promise.all([
        fetchCodeforcesData(codeforcesUsername),
        fetchCodeChefData(codechefUsername),
        fetchLeetCodeData(leetcodeUsername)
    ]);

    // console.log(codeforcesData, codechefData, leetcodeData);
    const combinedHeatMap = {};
    let totalProblemsSolved = 0;
    const ratings = {};

    if (codeforcesData?.result) {
        codeforcesData.result.forEach(submission => {
            const date = new Date(submission.creationTimeSeconds * 1000).toISOString().split('T')[0];
            combinedHeatMap[date] = (combinedHeatMap[date] || 0) + 1;
        });
        ratings.codeforces = codeforcesData?.profile?.currentRating || "N/A";
    }

    if (codechefData?.heatMap) {
        codechefData.heatMap.forEach(entry => {
            combinedHeatMap[entry.date] = (combinedHeatMap[entry.date] || 0) + entry.value;
            totalProblemsSolved += entry.value;
        });
        ratings.codechef = codechefData.currentRating || "N/A";
    }

    if (leetcodeData?.data?.matchedUser?.userCalendar?.submissionCalendar) {
        const leetCodeSubmissions = JSON.parse(leetcodeData.data.matchedUser.userCalendar.submissionCalendar);
        Object.entries(leetCodeSubmissions).forEach(([timestamp, count]) => {
            const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
            combinedHeatMap[date] = (combinedHeatMap[date] || 0) + count;
            totalProblemsSolved += count;
        });
    }

    return {
        heatmap: combinedHeatMap,
        totalProblemsSolved,
        ratings
    };
};

export default mergeCPData;
