export const fetchGFGData = async (gfg_username) => {
  try {
    const res = await fetch(`/api/profile/gfg/${gfg_username}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("GeeksForGeeks API res was not ok");
    }
    const data = await res.json();
    return {
      prob_solved: data.pageProps.userInfo.total_problems_solved,
      rating: data.pageProps.contestData.user_contest_data.current_rating,
    };
  } catch (error) {
    console.log("Error fetching GeeksForGeeks profile data: ", error);
    throw error;
  }
};
