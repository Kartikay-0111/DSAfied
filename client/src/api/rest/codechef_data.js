export const fetchCCData = async (cc_username) => {
  const apiUrl = `https://codechef-api.vercel.app/handle/${cc_username}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Codechef API res was not ok");
    }
    const data = await res.json();
    return {
        currentRating: data.currentRating,
        highestRating: data.highestRating,
        no_of_contests: data.ratingData.length,
        stars: data.stars
    }
  } catch (error) {
    console.log('Error fetching codechef profile data: ', error);
    throw error
  }
};
