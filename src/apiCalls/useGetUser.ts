import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { getToken } from "../utils/getSetToken";
import instance from "./instance";

const getuser = () => instance.get("/user");

type UseGetUser = () => UseQueryResult<AxiosResponse, AxiosError>;

const useGetUser: UseGetUser = () => {
  return useQuery("user", getuser, {
    enabled: getToken() ? true : false,
    retry: 3,
  });
};

export default useGetUser;
