import React from "react";
import {
  CSSObject,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Theme,
} from "@mui/material";

interface DrawerItemProps extends React.PropsWithChildren<{}> {
  handleDrawer?: () => void;
  drawerOpen: boolean;
  icon: React.ReactNode;
  text: string;
}

const listItemButtonStyle = (theme: Theme): CSSObject => {
  return {
    justifyContent: "center",
    height: "5vh",
  };
};

export const DrawerItem = (props: DrawerItemProps) => {
  return (
    <ListItemButton onClick={props.handleDrawer} sx={listItemButtonStyle}>
      <ListItemIcon
        sx={{ justifyContent: props.drawerOpen ? "left" : "center" }}
      >
        {props.icon}
      </ListItemIcon>
      <Slide direction="left" in={props.drawerOpen} mountOnEnter unmountOnExit>
        <ListItemText
          primary={props.text}
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        />
      </Slide>
    </ListItemButton>
  );
};
