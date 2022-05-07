import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { getToken } from "../utils/getSetToken";
import instance from "./instance";

const getPosts = () =>
  instance.get("/posts", {
    params: { "access-token": `Bearer ${getToken()}` },
  });

type UseGetPosts = () => UseQueryResult<AxiosResponse, AxiosError>;

const useGetPosts: UseGetPosts = () => {
  return useQuery("posts", getPosts, {
    enabled: getToken() ? true : false,
    retry: 3,
  });
};

export default useGetPosts;
