import React, { useState, useEffect } from "react";
// import './Profile.css';
import PlatformCard from "./PlatformCard";
import RatingChart from "./RatingChart";
import Sidebar from "./Sidebar";
import {
    LEETCODE_RATING,
    LEETCODE_TOTAL_QUES,
} from "../../api/graphql/queries/lc_user_data";
import { fetchLCData } from "../../api/rest/lc_data";
import { fetchCCData } from "../../api/rest/codechef_data";
import { fetchCFData } from "../../api/rest/codeforces_data";
import { fetchGFGData } from "../../api/rest/geeks_data";
import {
    fetchCodeforcesData,
    prepareChartData,
} from "../../api/rest/graph_data";

const Profile = () => {
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
                const variables = { userSlug: "Tan4585", username: "Tan4585" };
                const cc_username = "tan_4585";
                const cf_username = "Chef-KTK";
                // const gfg_username = "bhamanfak";

                const [probSolvedData, ratingData, cc_data, cf_data] =
                    await Promise.all([
                        fetchLCData(LEETCODE_TOTAL_QUES, variables),
                        fetchLCData(LEETCODE_RATING, variables),
                        fetchCCData(cc_username),
                        fetchCFData(cf_username),
                        // fetchGFGData(gfg_username),
                    ]);

                setLCSolvedQuestions(
                    probSolvedData.data.userProfileUserQuestionProgressV2.numAcceptedQuestions
                );
                setRatingLC(ratingData.data.userContestRanking);
                setCodechefData(cc_data);
                setCodeforcesData(cf_data);
                // setGeeksData(gfg_data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        fetchCodeforcesData(graphUsername).then((data) => {
            setRatingHistory(data);
        });
    }, [graphUsername]);

    console.log(codeforcesData);

    const chartData = prepareChartData(ratingHistory, graphUsername);

    const platforms = [
        {
            name: "LeetCode",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png",
            rating: loading ? "Loading..." : Math.round(ratingLC.rating),
            solved: loading
                ? "Loading..."
                : lcSolvedQuestions.reduce((acc, x) => acc + x.count, 0),
        },
        {
            name: "CodeChef",
            logo: "https://user-images.githubusercontent.com/63710339/185728318-0b976716-4f78-4a0a-a377-1643cc18a57e.png",
            currentRating: loading ? "Loading..." : codechefData.currentRating,
            highestRating: loading ? "Loading..." : codechefData.highestRating,
            stars: loading ? "Loading..." : codechefData.stars,
        },
        {
            name: "Codeforces",
            logo: "https://img.icons8.com/?size=160&id=jldAN67IAsrW&format=png",
            rating: loading ? "Loading..." : codeforcesData.rating,
            maxRating: loading ? "Loading..." : codeforcesData.maxRating,
            rank: codeforcesData.rank,
        },
        {
            name: "GeeksForGeeks",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/GeeksforGeeks.svg/640px-GeeksforGeeks.svg.png",
            rating: "Loading...",
            solved: "Loading..."
        },
    ];

    const [user, setUser] = useState({
        avatar: "https://avatars.githubusercontent.com/u/71320858?v=4",
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


    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Sidebar */}
            <div className="w-1/5 min-w-[250px]">
                <Sidebar user={user} onUpdate={setUser} />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 ml-[8vw]">
                {/* Rating Chart */}
                <div className="mb-8">
                    {ratingHistory.length > 0 ? (
                        <RatingChart chartData={chartData} />
                    ) : (
                        <p className="text-gray-400">Loading data...</p>
                    )}
                </div>

                {/* Platform Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {platforms.map((platform, index) => (
                        <div key={index} className="w-full">
                            <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 flex items-center justify-between">
                                {/* Logo Section */}
                                <div className="flex items-center justify-center w-24 h-24 bg-gray-900 rounded-full border-2 border-gray-700">
                                    <img
                                        src={platform.logo}
                                        alt={`${platform.name} logo`}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Platform Info */}
                                <div className="flex-1 px-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                                        {platform.name}
                                    </h3>
                                    
                
                                        <PlatformCard key={index} platform={platform} />                        
            
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
