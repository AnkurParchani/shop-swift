import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {
  deleteAccount,
  getLoggedInUser,
  login,
  signup,
  updatePassword,
} from "../services/apiUsers";
import { useNavigate } from "react-router-dom";

// Getting the currently logged in user
export const useGetUser = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  return { data, isLoading, error, refetch };
};

// Signup
export const useSignup = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [cookies, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      reset();
      // Removing the temporary user-img from localStorage
      localStorage.removeItem("user-img");

      // Setting the cookie
      setCookie("token", data.token);

      // Redirection to home page
      navigate("/");
      location.reload();

      // Showing success notification and resetting the form
      toast("Signed up successfully", { type: "success" });
    },
    onError: (err) => {
      toast(err.message, { type: "error", theme: "dark" });
    },
  });

  return { mutation, handleSubmit, register };
};

// Login
export const useLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [cookies, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      reset();
      // Setting the cookie
      setCookie("token", data.token);

      // Redirection to home page
      navigate("/");
      location.reload();

      // Showing success notification and resetting the form
      toast("Logged in successfully", { type: "success" });
    },
    onError: (err) => {
      toast(err.message, { type: "error", theme: "dark" });
    },
  });

  return { mutation, handleSubmit, register, reset };
};

// Update password
export const useUpdatePassword = () => {
  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast("Your password has been updated", { type: "success" });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};

// Deleting account
export const useDeleteMyAccount = () => {
  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast("Your account has been successfully deleted", { type: "success" });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};
