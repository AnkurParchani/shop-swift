import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllAddresses } from "../services/apiAddress";

// To get all the addresses of the user
export const useGetAddresses = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getAllAddresses,
    queryKey: ["my-address"],
  });

  return { data, isLoading, error };
};

// To add an address of the user
export const useAddAddress = () => {};

// To update an address of the user
export const useUpdateAddress = () => {};

// To delete an address of the user
export const useDeleteAddress = () => {};
