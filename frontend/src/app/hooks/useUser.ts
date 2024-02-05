import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoggedInUser, login, signup } from "../services/apiUsers";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// Getting the currently logged in user
export const useGetUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  return { data, isLoading, error };
};

// Signup
export const useSignup = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [cookies, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // Showing success notification and resetting the form
      toast("Signed up successfully", { type: "success" });
      reset();

      // Removing the temporary user-img from localStorage
      localStorage.removeItem("user-img");

      // Setting the cookie
      setCookie("token", data.token);

      // Redirection to home page
      router.push("/");
    },
    onError: (err) => {
      toast(err.message, { type: "error", theme: "dark" });
    },
  });

  return { mutation, handleSubmit, register };
};

// Login
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [cookies, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Showing success notification and resetting the form
      toast("Logged in successfully", { type: "success" });
      reset();

      // Setting the user in localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, img: data.img || undefined }),
      );

      // For Nav's useEffect run
      const storageEvent = new Event("storage");
      window.dispatchEvent(storageEvent);

      // Setting the cookie
      setCookie("token", data.token);

      // Invalidating all the essential tags
      queryClient.invalidateQueries({
        queryKey: ["my-wishlist"],
      });
      queryClient.refetchQueries({
        queryKey: ["my-wishlist"],
      });

      // Redirection to home page
      router.push("/");
    },
    onError: (err) => {
      toast(err.message, { type: "error", theme: "dark" });
    },
  });

  return { mutation, handleSubmit, register, reset };
};
