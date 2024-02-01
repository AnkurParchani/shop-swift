// Getting the user's img
export const getUserImg = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user-img") || null;
  }
};

// Formatting the date
export const formatDate = (date: string) => {
  const originalDate = new Date(date);

  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const year = originalDate.getFullYear().toString();

  return `${day}/${month}/${year}`;
};
