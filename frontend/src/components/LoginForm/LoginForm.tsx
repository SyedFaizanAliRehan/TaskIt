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
import { useReducer, useState } from "react";
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

const passwordPattern = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})"
);

const usernamePattern = new RegExp("^[a-zA-Z0-9]{3,}$");

export const LoginForm = () => {
  const theme = useTheme();
  const [username, usernameDispatcher] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );
  const [password, passwordDispatcher] = useReducer(
    textFieldReducer,
    textFieldInitialState
  );

  const [rememberMe, setRememberMe] = useState(false);
  const loginDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (usernamePattern.test(username.text) === false) {
      usernameDispatcher(text_field_in_valid("Invalid username"));
    } else if (passwordPattern.test(password.text) === false) {
      passwordDispatcher(
        text_field_in_valid(
          "Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        )
      );
    } else {
      setIsLoading(true);
      loginDispatch(login("dummy"));
      const redirectPath = location.state?.path || "/";
      navigate(redirectPath, { replace: true });
    }
  };
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
    </Box>
  );
};
