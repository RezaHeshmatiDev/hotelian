import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { getToken } from "../utils/getSetToken";
import instance from "./instance";

export type SuccessType = {
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

type PostParams = {
  page?: number;
  searchField?: string;
  searchKeyword?: string;
};

const getPosts = ({ page, searchField, searchKeyword }: PostParams) =>
  instance.get("/posts", {
    params: {
      "access-token": `${getToken()}`,
      page: page || 1,
      ...(searchField && searchKeyword
        ? { [`filter[${searchField}]`]: searchKeyword }
        : undefined),
    },
  });

type UseGetPosts = (
  params: PostParams
) => UseQueryResult<AxiosResponse<SuccessType>, AxiosError>;

const useGetPosts: UseGetPosts = (params) => {
  return useQuery("posts", () => getPosts({ ...params }), {
    enabled: false,
  });
};

export default useGetPosts;
