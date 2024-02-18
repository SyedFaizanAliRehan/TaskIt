import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Link,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

export const SignUpForm = () => {
  const theme = useTheme();
  return (
    // Outline of the login form
    <Box
      bgcolor={theme.palette.background.paper}
      height={"inherit"}
      width={{ md: "50vw", sm: "100vw", xs: "100vw" }}
      color={theme.palette.primary.main}
      display={"flex"}
      justifyContent={"center"}
    >
      {/* Backdrop to show loading spinner */}
      <Backdrop
        component="div"
        open={false}
        sx={{
          position: "absolute",
          left: { xs: "0", sm: "0", md: "25vw" },
          width: "inherit",
          height: "inherit",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        mountOnEnter
        unmountOnExit
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Sign Up form */}
      <Stack
        height={"inherit"}
        width={"inherit"}
        direction={"column"}
        textAlign={"center"}
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
        pt={{ xs: 4, sm: 4, md: 2, lg: 2 }}
      >
        {/* Title of the login form */}
        <Typography
          variant="h2"
          color={theme.palette.primary.main}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Sign Up
        </Typography>
        <form>
          <Stack p={5} spacing={4}>
            <Stack direction={"row"} spacing={2}>
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                variant="outlined"
                fullWidth
                type="text"
              />
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
                type="text"
              />
            </Stack>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              type="text"
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
            />
            <Stack direction={"row"} spacing={2}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
              />
              <TextField
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
              />
            </Stack>
            <Button variant="contained" color="primary" fullWidth size="large">
              Sign Up
            </Button>
            <Typography variant="subtitle1" textAlign={"center"}>
              Already have an account?{" "}
              <Link
                href="/Login"
                textTransform={"uppercase"}
                sx={{
                  textDecoration: "none",
                  ":hover": { fontWeight: "bold" },
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </form>
      </Stack>
      {/* Snackbar for showing errors */}
      <ClickAwayListener onClickAway={() => {}}>
        <Snackbar
          autoHideDuration={5000}
          open={false}
          onClose={() => {}}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message=""
          sx={{
            width: "auto",
          }}
        >
          <Slide direction="up" in={false} mountOnEnter unmountOnExit>
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: { xs: "100vw", sm: "80vw", md: "30vw" } }}
            >
              {}
            </Alert>
          </Slide>
        </Snackbar>
      </ClickAwayListener>
    </Box>
  );
};
