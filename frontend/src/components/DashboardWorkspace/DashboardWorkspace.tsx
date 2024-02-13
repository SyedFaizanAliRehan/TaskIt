import {
  Backdrop,
  Box,
  CSSObject,
  CircularProgress,
  Theme,
  Typography,
} from "@mui/material";
import { drawerCloseWidth } from "../Drawer/Drawer";

const DashboardWorkspaceStyle = (theme: Theme): CSSObject => {
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
    height: `calc(100vh - 8vh)`,
    pt: 2,
    pl: 2,
    overflowY: "auto",
    overflowX: "auto",
  };
};

interface DashboardWorkspaceProps {
  isLoading: boolean;
}

export const DashboardWorkspace = (props: DashboardWorkspaceProps) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", ...DashboardWorkspaceStyle }}
        open={props.isLoading}
        mountOnEnter
        unmountOnExit
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={DashboardWorkspaceStyle}>
        <Typography variant="h6">Dashboard</Typography>
      </Box>
    </>
  );
};
