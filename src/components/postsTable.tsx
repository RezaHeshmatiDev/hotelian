import { FC } from "react";
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
  sortData:
    | {
        field: "id" | "title";
        type: "asc" | "desc";
      }
    | undefined;
  onSort: (data: { field: "id" | "title"; type: "asc" | "desc" }) => void;
}

const PostsTable: FC<PostTableProps> = ({
  posts,
  handlePageChange,
  page,
  postsLength,
  perPage,
  sortData,
  onSort,
  ...rest
}) => {
  console.log({ sortData });
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortData && sortData.field == "id"}
                    direction={sortData?.type}
                    onClick={() =>
                      onSort({
                        field: "id",
                        type:
                          sortData?.field == "title"
                            ? "desc"
                            : sortData?.type == "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Id
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortData && sortData.field == "title"}
                    direction={sortData?.type}
                    onClick={() =>
                      onSort({
                        field: "title",
                        type:
                          sortData?.field == "id"
                            ? "desc"
                            : sortData?.type == "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
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
