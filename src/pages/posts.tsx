import { Container } from "@mui/material";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import instance from "../apiCalls/instance";
import useGetPosts, { SuccessType } from "../apiCalls/useGetPosts";
import DashboardLayout from "../components/dashboardLayout";
import Loading from "../components/loadingPage";
import PostsTable from "../components/postsTable";
import { errorModal } from "../utils/globalModal";

interface PostsPropsTypes {
  success: boolean;
  meta?: SuccessType["result"]["_meta"];
  posts?: SuccessType["result"]["items"];
  hasToken?: boolean;
}
const Posts = ({
  success,
  meta: metaa,
  posts: postss,
  hasToken,
}: PostsPropsTypes) => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError, refetch } = useGetPosts({ page });

  React.useEffect(() => {
    if (!hasToken) router.replace("/");
  }, []);

  React.useEffect(() => {
    if (!success && hasToken) refetch({});
  }, [success, hasToken]);
  React.useEffect(() => {
    if (page != 1) refetch({});
  }, [page]);

  if (isError) errorModal();

  if (isLoading)
    return (
      <Container>
        <Loading show={isLoading} />;
      </Container>
    );

  const posts = data?.data?.result?.items || postss;
  const metas = data?.data?.result?._meta || metaa;
  if (!isError) {
    return (
      <Container sx={{ backgroundColor: "primary.dark" }}>
        <h1>Posts</h1>
        {!!posts?.length ? (
          <PostsTable
            posts={posts}
            page={(metas?.currentPage || 1) - 1}
            postsLength={metas?.totalCount}
            handlePageChange={(page) => setPage(page + 1)}
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

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = req.cookies.token;
  if (token) {
    try {
      const res = await instance.get("/posts", {
        params: {
          "access-token": token,
        },
      });
      return {
        props: {
          posts: res?.data?.result?.items,
          meta: res?.data?.result?._meta,
          success: true,
          hasToken: true,
        },
      };
    } catch (e) {
      return {
        props: {
          success: false,
        },
      };
    }
  } else
    return {
      props: {
        hasToken: false,
        success: false,
      },
    };
}

export default Posts;
