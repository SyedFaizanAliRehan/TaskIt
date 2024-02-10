import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Link,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
  IconButton,
  Divider,
  Backdrop,
  Alert,
  Snackbar,
  Slide,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { useEffect, useReducer, useState } from "react";
import {
  textFieldInitialState,
  textFieldReducer,
} from "../../redux/textField/textFieldReducer";
import {
  text_field_in_valid,
  text_field_on_blur,
  text_field_on_change,
  text_field_on_click,
  text_field_on_focus,
} from "../../redux/textField/textFieldAction";
import { useDispatch } from "react-redux";
import { login } from "../../redux/login/loginAction";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginAPI } from "../../api/auth/LoginAPI";
import { useMutation } from "react-query";

// Regular expression for username and password
const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
const passwordPattern =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const LoginForm = () => {
  // Login form fields
  const [username, usernameDispatcher] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [password, passwordDispatcher] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState({
    isError: false,
    helperText: "",
  });
  const handleFormErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setFormError({ isError: false, helperText: "" });
  };

  // Misc
  const theme = useTheme();
  const loginDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data: loginData,
  } = useMutation({
    mutationFn: LoginAPI,
    onError: (error: any) => {
      return error;
    },
  });

  // Handling the response from the server
  useEffect(() => {
    if (isSuccess === true) {
      loginDispatch(login("dummy"));
      const redirectPath = location.state?.path || "/";
      navigate(redirectPath, { replace: true });
    } else if (isError === true) {
      setFormError({ isError: true, helperText: error.response?.data.detail });
    }
  }, [
    isSuccess,
    loginData,
    loginDispatch,
    navigate,
    location.state?.path,
    isError,
    error,
  ]);

  // This funtion validates the fields in login form and logs in the user
  const onLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // Checking if user name is valid
    if (usernamePattern.test(username.text) === false) {
      usernameDispatcher(text_field_in_valid("Invalid username"));
    }
    // Checking if password is valid
    else if (passwordPattern.test(password.text) === false) {
      passwordDispatcher(
        text_field_in_valid(
          "Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        )
      );
    }
    // If both fields are valid, then post the data to the server
    else {
      mutate({
        username: username.text,
        password: password.text,
      });
    }
  };
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
      {isLoading ? (
        // Backdrop to show loading spinner
        <Backdrop
          component="div"
          open={true}
          sx={{
            position: "inherit",
            width: "inherit",
            height: "inherit",
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        // Login form
        <Stack
          height={"inherit"}
          width={"inherit"}
          direction={"column"}
          textAlign={"center"}
          justifyContent={"center"}
          spacing={{ xs: 2, sm: 5, md: 10 }}
        >
          {/* Title of the login form */}
          <Typography
            variant="h2"
            color={theme.palette.primary.main}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            Task It
          </Typography>
          <form>
            <Stack spacing={{ xs: 1, sm: 2, md: 5 }} pl={5} pr={5}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                placeholder="Enter your username"
                fullWidth
                required
                value={username.text}
                error={username.isError}
                helperText={username.helperText}
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  usernameDispatcher(text_field_on_click(event))
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  usernameDispatcher(text_field_on_change(event))
                }
                onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                  usernameDispatcher(text_field_on_blur(event))
                }
                onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                  usernameDispatcher(text_field_on_focus(event))
                }
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                fullWidth
                required
                value={password.text}
                error={password.isError}
                helperText={password.helperText}
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  passwordDispatcher(text_field_on_click(event))
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  passwordDispatcher(text_field_on_change(event))
                }
                onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                  passwordDispatcher(text_field_on_blur(event))
                }
                onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                  passwordDispatcher(text_field_on_focus(event))
                }
              />
              {/* Foogot your password? and Remember me */}
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
                  control={
                    <Switch onClick={(event) => setRememberMe(!rememberMe)} />
                  }
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
                type="submit"
                disabled={
                  username.text.trim() === "" || password.text.trim() === ""
                }
                onClick={(event) => onLogin(event)}
              >
                Login
              </Button>
              {/* Sign up */}
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
          </form>
          <Divider style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            OR
          </Divider>
          {/* Social media login */}
          <Stack
            spacing={{ xs: 2, sm: 5, md: 10 }}
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

      <Snackbar
        autoHideDuration={5000}
        open={formError.isError && isLoading === false}
        onClose={handleFormErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message=""
        sx={{
          width: "auto",
        }}
      >
        <Slide direction="up" in={isError} mountOnEnter unmountOnExit>
          <Alert
            variant="filled"
            severity="error"
            sx={{ width: { xs: "100vw", sm: "80vw", md: "30vw" } }}
          >
            {formError.helperText}
          </Alert>
        </Slide>
      </Snackbar>
    </Box>
  );
};
