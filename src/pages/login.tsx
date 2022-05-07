import React, { ReactNode } from "react";
import DashboardLayout from "../components/dashboardLayout";

const Login = () => {
  return <div>login</div>;
};

Login.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Login;
