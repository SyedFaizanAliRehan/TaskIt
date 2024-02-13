import React from "react";
import {
  Typography,
  AppBar as MuiAppbar,
  Theme,
  CSSObject,
} from "@mui/material";
import { drawerCloseWidth } from "../Drawer/Drawer";

const AppBarStyle = (theme: Theme): CSSObject => {
  return {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerCloseWidth.md})`,
      ml: drawerCloseWidth.md,
    },
    [theme.breakpoints.only("sm")]: {
      width: `calc(100% - ${drawerCloseWidth.sm})`,
      ml: drawerCloseWidth.sm,
    },
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - ${drawerCloseWidth.xs})`,
      ml: drawerCloseWidth.xs,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    height: "6vh",
    pl: 2,
  };
};

export const Appbar = () => {
  return (
    <MuiAppbar position="relative" sx={AppBarStyle}>
      <Typography variant="h6" textTransform={"uppercase"}>
        Task It{" "}
      </Typography>
    </MuiAppbar>
  );
};
