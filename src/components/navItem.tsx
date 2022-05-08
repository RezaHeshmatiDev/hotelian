import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, ListItem } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface NavItemPropsType {
  href: string;
  icon: ReactNode;
  title: string;
  shouldDisable: boolean;
}

const NavItem: FC<NavItemPropsType> = ({
  href,
  icon,
  title,
  shouldDisable,
  ...others
}) => {
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
        color: "black ",
      }}
      {...others}
    >
      <NextLink href={href} passHref>
        <Button
          sx={{
            backgroundColor: active ? "primary.dark" : "none",
            borderRadius: 1,
            color: "black",
            fontWeight: active ? "Bold" : "none",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",

            "&:hover": {
              backgroundColor: active
                ? "primary.dark"
                : "rgba(100,100,100, 0.08)",
            },
          }}
          component="a"
          startIcon={icon}
          disableRipple
          disabled={shouldDisable}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

export default NavItem;
