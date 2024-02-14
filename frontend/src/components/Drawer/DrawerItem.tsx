import React from "react";
import {
  CSSObject,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Theme,
  Tooltip,
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
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    height: "5vh",
  };
};

export const DrawerItem = (props: DrawerItemProps) => {
  return (
    <>
      <ListItemButton onClick={props.handleDrawer} sx={listItemButtonStyle}>
        <Tooltip title={!props.drawerOpen && props.text} placement="right">
          <ListItemIcon
            sx={{ justifyContent: props.drawerOpen ? "left" : "center" }}
          >
            {props.icon}
          </ListItemIcon>
        </Tooltip>
        <Slide
          direction="left"
          in={props.drawerOpen}
          mountOnEnter
          unmountOnExit
          timeout={500}
        >
          <ListItemText
            primary={props.text}
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          />
        </Slide>
      </ListItemButton>
      <Divider />
    </>
  );
};
