import { FC, ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardSidebar from "./dashboardSidebar";
import useLogoutUser from "../apiCalls/useLogoutUser";
import { useRouter } from "next/router";
import { delToken } from "../utils/getSetToken";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 25,
  height: "100vh",
  backgroundColor: theme.palette.primary.dark,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

interface DashboardLayoutPropsType {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutPropsType> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const { data, isLoading, mutate: logoutUser } = useLogoutUser();

  useEffect(() => {
    if (data) {
      delToken();
      window.location.reload();
    }
  }, [data]);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        handleOnLogout={() => logoutUser({})}
        logouting={isLoading}
      />
    </>
  );
};

export default DashboardLayout;
