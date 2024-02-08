import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Link,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
  IconButton,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

export const LoginForm = () => {
  const theme = useTheme();
  const isLoading = false;
  return (
    <Box
      bgcolor={theme.palette.background.paper}
      height={"inherit"}
      width={{ md: "50vw", sm: "100vw", xs: "100vw" }}
      color={theme.palette.primary.main}
      display={"flex"}
      justifyContent={"center"}
    >
      {isLoading ? (
        <>
          <Skeleton
            variant="rectangular"
            height={"inherit"}
            width={"inherit"}
            sx={{ position: "absolute" }}
          />
          <Box
            height={"inherit"}
            width={"inherit"}
            position={"absolute"}
            bgcolor={"transparent"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            color={theme.palette.primary.main}
          >
            <Stack
              spacing={2}
              color={"inherit"}
              display={"flex"}
              textAlign={"center"}
              alignItems={"center"}
            >
              <CircularProgress color="inherit" />
              <Typography variant="subtitle1" color={"inherit"}>
                Logging in
              </Typography>
            </Stack>
          </Box>
        </>
      ) : (
        <Stack
          height={"inherit"}
          width={"inherit"}
          direction={"column"}
          textAlign={"center"}
          justifyContent={"center"}
          spacing={{ xs: 2, sm: 5, md: 10 }}
        >
          <Typography
            variant="h2"
            color={theme.palette.primary.main}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            Task It
          </Typography>
          <Stack spacing={{ xs: 1, sm: 2, md: 5 }} pl={5} pr={5}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              placeholder="Enter your username"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Enter your password"
              fullWidth
            />
            <Stack
              spacing={3}
              display={"flex"}
              justifyContent={"space-evenly"}
              textAlign={"center"}
              alignItems={"center"}
              direction={"row"}
            >
              <Link
                href="#"
                color={theme.palette.primary.main}
                textTransform={"uppercase"}
                sx={{
                  textDecoration: "none",
                  ":hover": { fontWeight: "bold" },
                }}
              >
                Forgot your password?
              </Link>
              <FormControlLabel
                value="end"
                control={<Switch />}
                label="Remember me"
                labelPlacement="end"
              />
            </Stack>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ textTransform: "uppercase" }}
            >
              Login
            </Button>
            <Typography variant="subtitle1" textAlign={"center"}>
              Dont have an account?{" "}
              <Link
                href="#"
                textTransform={"uppercase"}
                sx={{
                  textDecoration: "none",
                  ":hover": { fontWeight: "bold" },
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
          <Divider style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            OR
          </Divider>
          <Stack
            spacing={10}
            direction={"row"}
            display={"flex"}
            justifyContent={"center"}
          >
            <IconButton color="primary">
              <GoogleIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary">
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary">
              <AppleIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
