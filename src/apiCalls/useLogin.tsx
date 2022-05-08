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

type ErrorType = {
  ok: boolean;
  result: {
    field: string;
    message: string;
  }[];
};

type ResponseType = {
  ok: boolean;
  result: {
    access_token: string;
    expire_at: string;
  };
};

type UseLoginType = () => {
  data: AxiosResponse<ResponseType> | undefined;
  isLoading: boolean;
  error: AxiosError<ErrorType> | undefined;
  fetchLoginData: (params: LoginType) => void;
};

const useLogin: UseLoginType = () => {
  const [data, setData] = React.useState<
    AxiosResponse<ResponseType> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<AxiosError<ErrorType> | undefined>(
    undefined
  );

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
