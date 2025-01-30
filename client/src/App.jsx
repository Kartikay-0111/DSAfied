import React, { useState, useEffect } from "react";
import "./App.css";
import PlatformCard from "./components/Profile/PlatformCard";
import RatingChart from "./components/Profile/RatingChart";
import Sidebar from "./components/Profile/Sidebar";
import {
  LEETCODE_RATING,
  LEETCODE_TOTAL_QUES,
} from "./api/graphql/queries/lc_user_data";
import { fetchLCData } from "./api/rest/lc_data";
import { fetchCCData } from "./api/rest/codechef_data";
import { fetchCFData } from "./api/rest/codeforces_data";
import { fetchGFGData } from "./api/rest/geeks_data";

import {
  fetchCodeforcesData,
  prepareChartData,
} from "../src/api/rest/graph_data";

function App() {
  const [lcSolvedQuestions, setLCSolvedQuestions] = useState([]);
  const [ratingLC, setRatingLC] = useState([]);
  const [codechefData, setCodechefData] = useState([]);
  const [codeforcesData, setCodeforcesData] = useState([]);
  const [geeksData, setGeeksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [ratingHistory, setRatingHistory] = useState([]);
  const [graphUsername, setGraphusername] = useState("Chef-KTK");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const total_ques_query = LEETCODE_TOTAL_QUES;
        const rating_query = LEETCODE_RATING;
        const variables = { userSlug: "Tan4585", username: "Tan4585" };
        const cc_username = "tan_4585";
        const cf_username = "Chef-KTK";
        const gfg_username = "bhamanfak";

        const [probSolvedData, ratingData, cc_data, cf_data, gfg_data] =
          await Promise.all([
            fetchLCData(total_ques_query, variables),
            fetchLCData(rating_query, variables),
            fetchCCData(cc_username),
            fetchCFData(cf_username),
            fetchGFGData(gfg_username),
          ]);

        setLCSolvedQuestions(
          probSolvedData.data.userProfileUserQuestionProgressV2
            .numAcceptedQuestions
        );
        setRatingLC(ratingData.data.userContestRanking);
        setCodechefData(cc_data);
        setCodeforcesData(cf_data);
        setGeeksData(gfg_data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  // ---------------------------------------------------------------------------
  // Placeholder data for each platform
  const platforms = [
    {
      name: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png",
      username: "johndoe123",
      rating: loading ? "Loading..." : Math.round(ratingLC.rating),
      solved: loading
        ? "Loading..."
        : lcSolvedQuestions.reduce((acc, x) => acc + x.count, 0),
    },
    {
      name: "CodeChef",
      logo: "https://user-images.githubusercontent.com/63710339/185728318-0b976716-4f78-4a0a-a377-1643cc18a57e.png",
      username: "chefmaster99",
      currentRating: loading ? "Loading..." : codechefData.currentRating,
      highestRating: loading ? "Loading..." : codechefData.highestRating,
      stars: loading ? "Loading..." : codechefData.stars,
      solved: 300, // Placeholder for solved questions
    },
    {
      name: "Codeforces",
      logo: "https://img.icons8.com/?size=160&id=jldAN67IAsrW&format=png",
      username: "cf_expert",
      rating: loading ? "Loading..." : codeforcesData.rating,
      maxRating: loading ? "Loading..." : codeforcesData.maxRating,
      rank: codeforcesData.rank,
      solved: 200, // Placeholder for solved questions
    },
    {
      name: "GeeksForGeeks",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/GeeksforGeeks.svg/640px-GeeksforGeeks.svg.png",
      username: "geekcoder",
      rating: loading ? "Loading..." : geeksData.rating,
      solved: loading ? "Loading..." : geeksData.prob_solved, // Placeholder for solved questions
    },
  ];

  const [user, setUser] = useState({
    pfp: "https://avatars.githubusercontent.com/u/71320858?v=4",
    name: "Tanish Bhamare",
    username: "Tanish2207",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    console.log("Updated User:", updatedUser);
  };

  useEffect(() => {
    fetchCodeforcesData(graphUsername).then((data) => {
      setRatingHistory(data);
    });
  }, [graphUsername]);

  const chartData = prepareChartData(ratingHistory, graphUsername); 

  return (
    <div>
      <Sidebar user={user} onUpdate={handleUpdate}/>
      {ratingHistory.length > 0 ? (
        <RatingChart chartData={chartData} />
      ) : (
        <p>Loading data...</p>
      )}
      <div className="platforms-container">
        {platforms.map((platform, index) => (
          <PlatformCard key={index} platform={platform} />
        ))}
      </div>
    </div>
  );
}

export default App;
