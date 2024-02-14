import React from "react";
import {
  Typography,
  AppBar as MuiAppbar,
  Theme,
  CSSObject,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const AppBarStyle = (theme: Theme): CSSObject => {
  return {
    width: "100%",
    height: "6vh",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    pl: 2,
    zIndex: theme.zIndex.drawer + 3,
    color: theme.palette.primary.contrastText,
  };
};

interface AppbarProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  handleDrawer: () => void;
}

export const Appbar = (props: AppbarProps) => {
  return (
    <MuiAppbar position="relative" sx={AppBarStyle}>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <IconButton onClick={props.handleDrawer} color="inherit">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" textTransform={"uppercase"}>
          Task It{" "}
        </Typography>
      </Stack>
    </MuiAppbar>
  );
};
