// api.js
export const fetchLCSolvedQuestions = async () => {
    try {
      const response = await fetch('https://alfa-leetcode-api.onrender.com/tan4585/solved');
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      throw new Error(error.message); // Catch any error and rethrow it
    }
  };
  
export const fetchLCRating = async () => {
    try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/tan4585/contest')
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}