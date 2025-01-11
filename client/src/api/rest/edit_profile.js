export const edit_profile = async (username, data) => {
  try {
    const response = await fetch(`/api/profile/${username}`, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error while editing profile:", error);
    return { error: "An error occurred while editing profile" };
  }
};
