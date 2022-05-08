import { FC, ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardSidebar from "./dashboardSidebar";
import useLogoutUser from "../apiCalls/useLogoutUser";
import { useRouter } from "next/router";
import { delToken } from "../utils/getSetToken";
import DashboardNavbar from "./dashboardNavbar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  paddingTop: 50,
  backgroundColor: theme.palette.primary.dark,
  paddingBottom: "2rem",
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
            width: "100vw",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />

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
