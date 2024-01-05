// Getting the currenlty logged in user
export const getUser = () =>
  JSON.parse(localStorage.getItem("user") as string) || undefined;
