import {
  Backdrop,
  Box,
  CSSObject,
  CircularProgress,
  Theme,
} from "@mui/material";
import { drawerCloseWidth, drawerOpenWidth } from "../Drawer/Drawer";
import React from "react";

const DashboardWorkspaceOpenedStyle = (theme: Theme): CSSObject => {
  return {
    [theme.breakpoints.up("md")]: {
      width: `calc(calc(100% - ${drawerOpenWidth.md}) - 2vh)`,
      ml: drawerOpenWidth.md,
    },
    [theme.breakpoints.only("sm")]: {
      width: `calc(calc(100% - ${drawerOpenWidth.sm}) - 2vh)`,
      ml: drawerOpenWidth.sm,
    },
    [theme.breakpoints.down("sm")]: {
      width: `calc(calc(100% - ${drawerOpenWidth.xs}) - 2vh)`,
      ml: drawerOpenWidth.xs,
    },
    transition: theme.transitions.create("margin-left", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100vh - 8vh)`,
    pt: 2,
    pl: 2,
    overflowY: "auto",
    overflowX: "auto",
  };
};

const DashboardWorkspaceClosedStyle = (theme: Theme): CSSObject => {
  return {
    [theme.breakpoints.up("md")]: {
      width: `calc(calc(100% - ${drawerCloseWidth.md}) - 2vh)`,
      ml: drawerCloseWidth.md,
    },
    [theme.breakpoints.only("sm")]: {
      width: `calc(calc(100% - ${drawerCloseWidth.sm}) - 2vh)`,
      ml: drawerCloseWidth.sm,
    },
    [theme.breakpoints.down("sm")]: {
      width: `calc(calc(100% - ${drawerCloseWidth.xs}) - 2vh)`,
      ml: drawerCloseWidth.xs,
    },
    transition: theme.transitions.create("margin-left", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: `calc(100vh - 8vh)`,
    pt: 2,
    pl: 2,
    overflowY: "auto",
    overflowX: "auto",
  };
};

interface DashboardWorkspaceProps extends React.PropsWithChildren<{}> {
  isLoading: boolean;
  drawerOpen: boolean;
}

export const DashboardWorkspace = (props: DashboardWorkspaceProps) => {
  const style = props.drawerOpen
    ? DashboardWorkspaceOpenedStyle
    : DashboardWorkspaceClosedStyle;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", ...style }}
        open={props.isLoading}
        mountOnEnter
        unmountOnExit
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={style}>{props.children}</Box>
    </>
  );
};
