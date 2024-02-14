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
import { useNavigate } from "react-router-dom";

const listItemButtonStyle = (theme: Theme): CSSObject => {
  return {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    height: "5vh",
  };
};

interface DrawerItemProps extends React.PropsWithChildren<{}> {
  drawerOpen: boolean;
  icon: React.ReactNode;
  text: string;
  navigateTo: string;
}

export const DrawerItem = (props: DrawerItemProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItemButton
        onClick={() => {
          navigate(props.navigateTo);
        }}
        sx={listItemButtonStyle}
      >
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
