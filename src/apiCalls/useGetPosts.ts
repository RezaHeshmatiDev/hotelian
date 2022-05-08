import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { getToken } from "../utils/getSetToken";
import instance from "./instance";

type SuccessType = {
  result: {
    _meta: {
      totalCount: number;
      currentPage: number;
      pageCount: number;
      perPage: number;
    };
    items: {
      content: string;
      created_at: string;
      id: number;
      status: 0 | 1;
      title: string;
      updated_at: string;
    }[];
  };
};

const getPosts = () =>
  instance.get("/posts", {
    params: { "access-token": `${getToken()}` },
  });

type UseGetPosts = () => UseQueryResult<AxiosResponse<SuccessType>, AxiosError>;

const useGetPosts: UseGetPosts = () => {
  return useQuery("posts", getPosts, {
    enabled: getToken() ? true : false,
    retry: 3,
  });
};

export default useGetPosts;
