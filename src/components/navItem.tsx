import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, ListItem } from "@mui/material";
import { FC, ReactNode } from "react";

interface NavItemPropsType {
  href: string;
  icon: ReactNode;
  title: string;
}

const NavItem: FC<NavItemPropsType> = ({ href, icon, title, ...others }) => {
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
      }}
      {...others}
    >
      <NextLink href={href} passHref>
        <Button component="a" startIcon={icon} disableRipple>
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

export default NavItem;
