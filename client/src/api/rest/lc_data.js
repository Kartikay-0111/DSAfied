export const fetchLCData = async (query, variables) => {
  try {
    const res = await fetch(`/api/profile/${variables.userSlug}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query, variables}),
    })

    if(!res.ok){
      throw new Error('Network res was not ok')
    }

    const data = await res.json()
    return data;
  } catch (error) {
    console.log('Error fetching leetcode profile data: ', error);
    throw error
  }
}