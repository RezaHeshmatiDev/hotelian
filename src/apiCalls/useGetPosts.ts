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

const getPosts = ({ page }: { page: number }) =>
  instance.get("/posts", {
    params: { "access-token": `${getToken()}`, page: page || 1 },
  });

type UseGetPosts = ({
  page,
}: {
  page: number;
}) => UseQueryResult<AxiosResponse<SuccessType>, AxiosError>;

const useGetPosts: UseGetPosts = ({ page }: { page: number }) => {
  return useQuery("posts", () => getPosts({ page }), {
    enabled: false,
  });
};

export default useGetPosts;
