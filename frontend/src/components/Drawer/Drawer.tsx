import React, { useState } from "react";
import {
  CSSObject,
  Divider,
  List,
  Drawer as MuiDrawer,
  Theme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { DrawerItem } from "./DrawerItem";

export const drawerOpenWidth = {
  xs: "80vw",
  sm: "40vw",
  md: "30vw",
};
export const drawerCloseWidth = {
  xs: "15vw",
  sm: "12.5vw",
  md: "8vw",
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
    },
  };
};

export const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <MuiDrawer
      variant="permanent"
      component="div"
      sx={drawerOpen ? drawerOpenStyle : drawerClosedStyle}
    >
      <List component="nav">
        <DrawerItem
          handleDrawer={handleDrawer}
          drawerOpen={drawerOpen}
          icon={<MenuIcon />}
          text="Task It"
        />
        <Divider />
        <DrawerItem
          drawerOpen={drawerOpen}
          icon={<AdminPanelSettingsIcon />}
          text="Admin Panel"
        />
      </List>
    </MuiDrawer>
  );
};
