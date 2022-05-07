import { FC, ReactNode, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardSidebar from "./dashboardSidebar";

const DashboardLayoutRoot = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 25,
}));

interface DashboardLayoutPropsType {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutPropsType> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
      />
    </>
  );
};

export default DashboardLayout;
