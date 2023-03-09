import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../../components/LoginForm/LoginForm";
import styles from "./styles";
const Login = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const { classes } = styles(theme, isNonMobileScreens);

  return (
    <Box>
      <Box sx={classes.navbar}>
        <Typography sx={classes.navbar__typography}>Social-app</Typography>
      </Box>
      <Box sx={classes.content}>
        <Typography sx={classes.content__typography}>
          Welcome to Social-app!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
