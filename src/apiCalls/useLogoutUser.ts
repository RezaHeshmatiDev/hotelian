import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { getToken } from "../utils/getSetToken";
import instance from "./instance";

type LogoutUserType = () => Promise<AxiosResponse<any, any>>;

export const logoutUser: LogoutUserType = () => {
  return instance.delete(`/users/logout`, {
    params: {
      "access-token": `${getToken()}`,
    },
  });
};

type UseLogoutUser = () => UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError
>;

const useLogoutUser: UseLogoutUser = () => {
  return useMutation(logoutUser);
};

export default useLogoutUser;
