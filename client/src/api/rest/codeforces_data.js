export const fetchCFData = async (cf_username) => {
  const apiUrl = `https://codeforces.com/api/user.info?handles=${cf_username}`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Codeforces API res was not ok");
    }
    const data = await res.json();
    return {
        rank: data.result[0].rank,
        rating: data.result[0].rating,
        maxRating: data.result[0].maxRating,
    };
  } catch (error) {
    console.log("Error fetching codeforces profile data: ", error);
    throw error;
  }
};
