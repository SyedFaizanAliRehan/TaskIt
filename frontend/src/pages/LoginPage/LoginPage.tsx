import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Box, useTheme } from "@mui/material";

export const LoginPage = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.divider}
      height={"inherit"}
      width={"inherit"}
      display={"flex"}
      justifyContent={"center"}
    >
      <LoginForm />
    </Box>
  );
};
