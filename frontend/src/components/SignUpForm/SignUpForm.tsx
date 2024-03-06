import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
  Divider,
  Backdrop,
  Alert,
  Snackbar,
  Slide,
  ClickAwayListener,
} from "@mui/material";
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
import {
  verifyEmailPattern,
  verifyPasswordPattern,
  verifyUsernamePattern,
} from "../../utils/RegularExpressions/RegularExpressions";
import { useMutation } from "react-query";
import { SignUpAPI } from "../../api/auth/SignUpAPI";
import { useDispatch } from "react-redux";
import { login } from "../../redux/login/loginAction";
import { useLocation, useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const [firstName, firstNameReducer] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [lastName, lastNameReducer] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [username, usernameReducer] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [email, emailReducer] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [password, passwordReducer] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [confirmPassword, confirmPasswordReducer] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [formValid, setFormValid] = useState({
    isError: false,
    helperText: "",
  });
  const handleFormErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setFormValid({ isError: false, helperText: "" });
      return;
    }
  };

  // Misc
  const theme = useTheme();
  const loginDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    mutate: SignUpMutate,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: SignUpAPI,
    onError: (error: any) => {
      return error;
    },
  });

  useEffect(() => {
    if (isSuccess === true) {
      loginDispatch(login("dummy"));
      const redirectPath = location.state?.path || "/";
      navigate(redirectPath, { replace: true });
    } else if (isError === true) {
      if (error.response)
        setFormValid({
          isError: true,
          helperText: error.response?.data.detail,
        });
      else
        setFormValid({
          isError: true,
          helperText: "Unable to login. Please try again later.",
        });
    }
  }, [
    isSuccess,
    isError,
    error,
    setFormValid,
    loginDispatch,
    navigate,
    location,
  ]);

  // singup form validation
  const onFromSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // verify username
    if (verifyUsernamePattern(username.text) === false) {
      usernameReducer(text_field_in_valid("Invalid Username"));
    }
    // verify email
    else if (verifyEmailPattern(email.text) === false) {
      emailReducer(text_field_in_valid("Invalid Email"));
    }
    // verify password
    else if (verifyPasswordPattern(password.text) === false) {
      passwordReducer(text_field_in_valid("Invalid Password"));
    }
    // verify password
    else if (verifyPasswordPattern(confirmPassword.text) === false) {
      confirmPasswordReducer(text_field_in_valid("Invalid Password"));
    }
    // Password and confirm password should match
    else if (password.text !== confirmPassword.text) {
      confirmPasswordReducer(text_field_in_valid("Passwords do not match"));
    } else {
      SignUpMutate({
        first_name: firstName.text,
        last_name: lastName.text,
        user_name: username.text,
        email: email.text,
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
      {/* Backdrop to show loading spinner */}
      <Backdrop
        component="div"
        open={isLoading}
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
        spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
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
        <Divider />
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
                value={firstName.text}
                error={firstName.isError === true}
                helperText={firstName.helperText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  firstNameReducer(text_field_on_change(e))
                }
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  firstNameReducer(text_field_on_click(e))
                }
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  firstNameReducer(text_field_on_blur(e))
                }
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                  firstNameReducer(text_field_on_focus(e))
                }
              />
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
                type="text"
                value={lastName.text}
                error={lastName.isError === true}
                helperText={lastName.helperText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  lastNameReducer(text_field_on_change(e))
                }
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  lastNameReducer(text_field_on_click(e))
                }
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  lastNameReducer(text_field_on_blur(e))
                }
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                  lastNameReducer(text_field_on_focus(e))
                }
              />
            </Stack>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              type="text"
              value={username.text}
              error={username.isError === true}
              helperText={username.helperText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                usernameReducer(text_field_on_change(e))
              }
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                usernameReducer(text_field_on_click(e))
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                usernameReducer(text_field_on_blur(e))
              }
              onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                usernameReducer(text_field_on_focus(e))
              }
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email.text}
              error={email.isError === true}
              helperText={email.helperText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                emailReducer(text_field_on_change(e))
              }
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                emailReducer(text_field_on_click(e))
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                emailReducer(text_field_on_blur(e))
              }
              onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                emailReducer(text_field_on_focus(e))
              }
            />
            <Stack direction={"row"} spacing={2}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password.text}
                error={password.isError === true}
                helperText={password.helperText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  passwordReducer(text_field_on_change(e))
                }
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  passwordReducer(text_field_on_click(e))
                }
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  passwordReducer(text_field_on_blur(e))
                }
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                  passwordReducer(text_field_on_focus(e))
                }
              />
              <TextField
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword.text}
                error={confirmPassword.isError === true}
                helperText={confirmPassword.helperText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  confirmPasswordReducer(text_field_on_change(e))
                }
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  confirmPasswordReducer(text_field_on_click(e))
                }
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  confirmPasswordReducer(text_field_on_blur(e))
                }
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                  confirmPasswordReducer(text_field_on_focus(e))
                }
              />
            </Stack>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={
                firstName.text.trim() === "" ||
                lastName.text.trim() === "" ||
                username.text.trim() === "" ||
                email.text.trim() === "" ||
                password.text.trim() === "" ||
                confirmPassword.text.trim() === "" ||
                formValid.isError
              }
              onClick={(event) => onFromSubmit(event)}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <Divider />
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          fontStyle={"italic"}
        >
          Already have an account?{" "}
          <Link
            href="/Login"
            textTransform={"uppercase"}
            sx={{
              textDecoration: "none",
              fontStyle: "normal",
              ":hover": { fontWeight: "bold" },
            }}
          >
            Login
          </Link>
        </Typography>
      </Stack>
      {/* Snackbar for showing errors */}
      <ClickAwayListener onClickAway={handleFormErrorClose}>
        <Snackbar
          autoHideDuration={5000}
          open={formValid.isError}
          onClose={() => setFormValid({ isError: false, helperText: "" })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message=""
          sx={{
            width: "auto",
          }}
        >
          <Slide
            direction="up"
            in={formValid.isError}
            mountOnEnter
            unmountOnExit
          >
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: { xs: "100vw", sm: "80vw", md: "30vw" } }}
            >
              {formValid.helperText}
            </Alert>
          </Slide>
        </Snackbar>
      </ClickAwayListener>
    </Box>
  );
};
