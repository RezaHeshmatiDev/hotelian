import { FC } from "react";
import NextLink from "next/link";
import { Box, Divider, Drawer, ListItem, Typography } from "@mui/material";

import NavItem from "./navItem";
import HomeIcon from "@mui/icons-material/Home";
import InterestsIcon from "@mui/icons-material/Interests";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getToken } from "../utils/getSetToken";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LoadingButton } from "@mui/lab";

const items = [
  {
    href: "/",
    icon: <HomeIcon fontSize="small" />,
    title: "Home",
  },
  {
    href: "/login",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Login",
  },
  {
    href: "/posts",
    icon: <InterestsIcon fontSize="small" />,
    title: "Posts",
  },
];

interface DashboardSidebarPropsType {
  open: boolean;
  onClose: () => void | undefined;
  handleOnLogout: () => void;
  logouting: boolean;
}

const DashboardSidebar: FC<DashboardSidebarPropsType> = ({
  open,
  onClose,
  handleOnLogout,
  logouting,
}) => {
  // const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
  //   defaultMatches: true,
  //   noSsr: false,
  // });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "primary.main",
        }}
      >
        <div>
          <Box
            sx={{
              pt: 3,
              display: "flex",
              alignItem: "center",
              justifyContent: "space-around",
              padding: "1rem 0",
              color: "black",
            }}
          >
            <NextLink href="/" passHref>
              <a>logo here</a>
            </NextLink>
            <div>
              <Typography color="inherit" variant="subtitle1">
                Hotelian
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Admin panel{" "}
              </Typography>
            </div>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            padding: "1rem 0 ",
          }}
        >
          {items.map((item, index) => {
            return (
              <div onClick={onClose} key={item.title}>
                <NavItem
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                  shouldDisable={
                    (index == 1 && !!getToken()) || (index == 2 && !getToken())
                  }
                />
              </div>
            );
          })}

          {getToken() && (
            <ListItem
              disableGutters
              sx={{
                display: "flex",
                mb: 0.5,
                mt: 10,
                py: 0,
                px: 2,
                color: "black ",
              }}
            >
              <LoadingButton
                loading={logouting}
                sx={{
                  borderRadius: 1,
                  color: "black",
                  justifyContent: "flex-start",
                  px: 3,
                  textAlign: "left",
                  textTransform: "none",
                  width: "100%",

                  "&:hover": {
                    backgroundColor: "rgba(100,100,100, 0.08)",
                  },
                }}
                component="a"
                startIcon={<ExitToAppIcon fontSize="small" />}
                disableRipple
                onClick={handleOnLogout}
              >
                <Box sx={{ flexGrow: 1 }}>Exit</Box>
              </LoadingButton>
            </ListItem>
          )}
        </Box>
      </Box>
    </>
  );

  // if (lgUp) {
  //   return (
  //     <Drawer
  //       anchor="left"
  //       open={open}
  //       PaperProps={{
  //         sx: {
  //           backgroundColor: "primary.light",
  //           color: "#FFFFFF",
  //           width: 280,
  //         },
  //       }}
  //       variant="permanent"
  //     >
  //       {content}
  //     </Drawer>
  //   );
  // }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      // sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
