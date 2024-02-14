import React from "react";
import { CSSObject, List, Drawer as MuiDrawer, Theme } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TaskIcon from "@mui/icons-material/Task";
import LogoutIcon from "@mui/icons-material/Logout";
import { DrawerItem } from "./DrawerItem";

export const drawerOpenWidth = {
  xs: "80vw",
  sm: "30vw",
  md: "15vw",
};
export const drawerCloseWidth = {
  xs: "16vw",
  sm: "8vw",
  md: "5vw",
};

const drawerOpenStyle = (theme: Theme): CSSObject => {
  return {
    [theme.breakpoints.up("md")]: { width: drawerOpenWidth.md },
    [theme.breakpoints.only("sm")]: { width: drawerOpenWidth.sm },
    [theme.breakpoints.down("sm")]: { width: drawerOpenWidth.xs },
    zIndex: theme.zIndex.drawer + 1,
    overflowX: "hidden",
    position: "absolute",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiDrawer-paper": {
      width: "inherit",
      boxSizing: "border-box",
      mt: "6.5vh",
    },
  };
};

const drawerClosedStyle = (theme: Theme): CSSObject => {
  return {
    [theme.breakpoints.up("md")]: { width: drawerCloseWidth.md },
    [theme.breakpoints.only("sm")]: { width: drawerCloseWidth.sm },
    [theme.breakpoints.down("sm")]: { width: drawerCloseWidth.xs },
    zIndex: theme.zIndex.drawer + 1,
    overflowX: "hidden",
    position: "fixed",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiDrawer-paper": {
      width: "inherit",
      boxSizing: "border-box",
      overflow: "hidden",
      mt: "6.5vh",
    },
  };
};

interface DrawerProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  drawerOpen: boolean;
}

export const Drawer = (props: DrawerProps) => {
  return (
    <MuiDrawer
      variant="permanent"
      component="div"
      sx={props.drawerOpen ? drawerOpenStyle : drawerClosedStyle}
    >
      <List component="nav">
        <DrawerItem
          drawerOpen={props.drawerOpen}
          icon={<AdminPanelSettingsIcon />}
          text="Admin Panel"
          navigateTo="/"
        />
        <DrawerItem
          drawerOpen={props.drawerOpen}
          icon={<TaskIcon />}
          text="Tasks"
          navigateTo="/tasks"
        />
        <DrawerItem
          drawerOpen={props.drawerOpen}
          icon={<LogoutIcon />}
          text="Logout"
          navigateTo="/"
        />
      </List>
    </MuiDrawer>
  );
};
