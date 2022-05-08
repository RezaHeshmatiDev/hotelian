import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import instance from "./instance";

//create a custom hook :)
type LoginType = {
  username: string;
  password: string;
};
const login = (params: LoginType) =>
  instance.post("/users/login", {
    ...params,
  });

type SuccessType = {
  ok: string;
  result: {
    access_token: string;
    expire_at: string;
  };
};

type UseLoginType = () => {
  data: AxiosResponse<SuccessType> | undefined;
  isLoading: boolean;
  error: AxiosError<unknown, any> | undefined;
  fetchLoginData: (params: LoginType) => void;
};

const useLogin: UseLoginType = () => {
  const [data, setData] = React.useState<
    AxiosResponse<SuccessType> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<
    AxiosError<unknown, any> | undefined
  >(undefined);

  const fetchLoginData = (params: LoginType) => {
    setIsLoading(true);
    login(params)
      .then((res) => {
        setData(res);
        setError(undefined);
      })
      .catch((err) => {
        setError(err);
        setData(undefined);
      })
      .finally(() => setIsLoading(false));
  };

  return { data, isLoading, error, fetchLoginData };
};

export default useLogin;
