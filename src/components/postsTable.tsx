import { FC, MouseEvent, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

interface PostTableProps {
  posts: {
    content: string;
    created_at: string;
    id: number;
    status: 0 | 1;
    title: string;
    updated_at: string;
  }[];
  page?: number;
  postsLength?: number;
  handlePageChange: (page: number) => void;
  perPage?: number;
}

const PostsTable: FC<PostTableProps> = ({
  posts,
  handlePageChange,
  page,
  postsLength,
  perPage,
  ...rest
}) => {
  console.log({ posts });
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts?.map((post) => (
                <TableRow hover key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={postsLength || 0}
        onPageChange={(e, page) => handlePageChange(page)}
        page={page || 0}
        rowsPerPage={perPage || 20}
      />
    </Card>
  );
};

export default PostsTable;
