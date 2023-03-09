import { Typography, useTheme } from "@mui/material";
import { PropTypes } from "prop-types";
import FlexBetween from "components/UI/FlexBetween";
import WidgetWrapper from "components/UI/WidgetWrapper";
import styles from "./styles";
const Advert = ({ size = "200px" }) => {
  const theme = useTheme();
  const { classes } = styles(theme);

  return (
    <WidgetWrapper sx={classes.root}>
      <FlexBetween sx={classes.root__flex}>
        <Typography sx={classes.root__flex_sponsored}>Sponsored</Typography>
        <Typography sx={classes.root__flex_ad}>Create Ad</Typography>
      </FlexBetween>
      <img
        style={{ objectFit: "cover", borderRadius: "5%" }}
        width="100%"
        height="auto"
        alt="advert"
        src="../assets/advertMessenger.png"
      />

      <Typography sx={classes.root_description}>
        Add Messenger live chat to your website
      </Typography>
      <Typography sx={classes.root_site}>Facebook.com</Typography>
    </WidgetWrapper>
  );
};
Advert.propTypes = {
  size: PropTypes.string,
};
export default Advert;
