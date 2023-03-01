import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        padding="1rem"
        textAlign="center"
        width="100%"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color={theme.palette.primary.main}
        >
          Social-app
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        p="2rem"
        m="3rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Welcome to Social-app!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
