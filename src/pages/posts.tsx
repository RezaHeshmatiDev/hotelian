import React, { ReactNode } from "react";
import DashboardLayout from "../components/dashboardLayout";

const Posts = () => {
  return <div>Posts</div>;
};

Posts.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Posts;
