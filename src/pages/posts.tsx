import { Container } from "@mui/material";
import React, { ReactNode } from "react";
import useGetPosts from "../apiCalls/useGetPosts";
import DashboardLayout from "../components/dashboardLayout";
import Loading from "../components/loadingPage";
import PostsTable from "../components/postsTable";
import { errorModal } from "../utils/globalModal";

const Posts = () => {
  const { data, isLoading, isError, isIdle } = useGetPosts();
  if (isError) return errorModal();

  if (isLoading)
    return (
      <Container>
        <Loading show={isLoading} />;
      </Container>
    );

  const posts = data?.data?.result?.items;
  console.log({ data, posts });
  const metas = data?.data?.result?._meta;
  if (!isError) {
    return (
      <Container>
        <h1>Posts</h1>
        {!!posts?.length ? (
          <PostsTable
            posts={posts}
            page={metas?.currentPage}
            postsLength={metas?.totalCount}
            handlePageChange={(page) => console.log({ page })}
            perPage={metas?.perPage}
          />
        ) : (
          <Container>There is no posts yet</Container>
        )}
      </Container>
    );
  } else return <div></div>;
};

Posts.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Posts;
