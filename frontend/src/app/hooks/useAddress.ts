import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAddress, getAllAddresses } from "../services/apiAddress";
import { toast } from "react-toastify";

// To get all the addresses of the user
export const useGetAddresses = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getAllAddresses,
    queryKey: ["my-address"],
  });

  return { data, isLoading, error };
};

// To add an address of the user
export const useAddAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-address"] });
    },
    onError(err: Error) {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
};

// To update an address of the user
export const useUpdateAddress = () => {};

// To delete an address of the user
export const useDeleteAddress = () => {};
