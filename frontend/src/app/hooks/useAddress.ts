import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  deleteAddress,
  getMyAddresses,
  updateAddress,
} from "../services/apiAddress";
import { toast } from "react-toastify";

// To get all the addresses of the user
export const useGetMyAddresses = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: getMyAddresses,
    queryKey: ["my-address"],
    staleTime: 30000,
  });

  return { data, isLoading, error, refetch };
};

// To add an address of the user
export const useAddAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
      queryClient.refetchQueries({ queryKey: ["my-address"] });
    },
    onError(err: Error) {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
};

// To update an address of the user
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
      queryClient.refetchQueries({ queryKey: ["my-address"] });
    },
    onError(err: Error) {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
};

// To delete an address of the user
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
      queryClient.refetchQueries({ queryKey: ["my-address"] });
    },
    onError(err: Error) {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
};
