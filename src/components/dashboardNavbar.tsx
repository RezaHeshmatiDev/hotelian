import styled from "@emotion/styled";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  width: "100%",
  // idk why it couldn't find the types :/
  // backgroundColor: theme.palette.primary.main,
  backgroundColor: "#7e9666",
}));

interface DashboardNavbarPropsTypes {
  onSidebarOpen: () => void;
}

const DashboardNavbar = (props: DashboardNavbarPropsTypes) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: "inline-flex",
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
          >
            <AccountCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

export default DashboardNavbar;
