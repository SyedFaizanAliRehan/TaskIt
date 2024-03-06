import { Box, useTheme } from "@mui/material";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

export const SignUpPage = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.divider}
      height={"inherit"}
      width={"inherit"}
      display={"flex"}
      justifyContent={"center"}
    >
      <SignUpForm />
    </Box>
  );
};
