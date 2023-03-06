import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const Advert = ({ size = "200px" }) => {
  const theme = useTheme();

  return (
    <WidgetWrapper margin="0 0 1rem 0">
      <FlexBetween margin="0 0 0.5rem 0">
        <Typography
          color={theme.palette.neutral.dark}
          variant="h5"
          fontWeight="500"
        >
          Sponsored
        </Typography>
        <Typography
          color={theme.palette.neutral.medium}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          Create Ad
        </Typography>
      </FlexBetween>
      <img
        style={{ objectFit: "cover", borderRadius: "5%" }}
        width="100%"
        height="auto"
        alt="advert"
        src="../assets/advertMessenger.png"
      />

      <Typography
        color={theme.palette.neutral.medium}
        margin="0.5rem 0"
        textAlign="center"
      >
        Add Messenger live chat to your website
      </Typography>
      <Typography color={theme.palette.neutral.medium} textAlign="center">
        Facebook.com
      </Typography>
    </WidgetWrapper>
  );
};

export default Advert;
