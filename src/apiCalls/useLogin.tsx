import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import instance from "./instance";
//create a custom hook

type LoginType = {
  userName: string;
  password: string;
};
const login = (params: LoginType) =>
  instance.post("/login", {
    params,
  });

type UseLoginType = () => {
  data: AxiosResponse<any> | undefined;
  isLoading: boolean;
  error: AxiosError<unknown, any> | undefined;
  fetchLoginData: (params: LoginType) => void;
};

const useLogin: UseLoginType = () => {
  const [data, setData] = React.useState<AxiosResponse<any> | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<
    AxiosError<unknown, any> | undefined
  >(undefined);

  const fetchLoginData = (params: LoginType) => {
    setIsLoading(true);
    login(params)
      .then((res) => setData(res))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return { data, isLoading, error, fetchLoginData };
};

export default useLogin;
