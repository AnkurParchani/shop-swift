// Getting the currenlty logged in user
export const getUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user") as string) || null;
  }
};

// Getting the user's img
export const getUserImg = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user-img") || null;
  }
};
