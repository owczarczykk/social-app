import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage/UserImage";
import FlexBetween from "components/UI/FlexBetween";
import WidgetWrapper from "components/UI/WidgetWrapper";
import PropTypes from "prop-types";
import styles from "./styles";
const User = ({
  userId,
  imgPath,
  name,
  lastName,
  friendsLength,
  location,
  occupation,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { classes } = styles(theme);

  return (
    <WidgetWrapper sx={classes.root}>
      <FlexBetween
        sx={classes.root__firstRow}
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage imgPath={imgPath} />
          <Box>
            <Typography sx={classes.root__firstRow_fullName}>
              {name} {lastName}
            </Typography>
            <Typography sx={classes.root__firstRow_friends}>
              {friendsLength} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={classes.root__firstRow_button} />
      </FlexBetween>

      <Divider />

      <Box sx={classes.root__secondRow}>
        <Box sx={classes.root__secondRow__location}>
          <LocationOnOutlined sx={classes.root__secondRow_button} />
          <Typography sx={classes.root__secondRow_typography}>
            {location}
          </Typography>
        </Box>
        <Box sx={classes.root__secondRow__work}>
          <WorkOutlineOutlined sx={classes.root__secondRow_button} />
          <Typography sx={classes.root__secondRow_typography}>
            {occupation}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={classes.root__thirdRow}>
        <Typography sx={classes.root__thirdRow_typography}>
          Social Profiles
        </Typography>
        <FlexBetween sx={classes.root__thirdRow__flex}>
          <FlexBetween sx={classes.root__thirdRow__flex__flex}>
            <img alt="linkedin" src="../assets/linkedin.png" />
            <Box sx={classes.root__thirdRow__flex__flex_Box}>
              <Typography sx={classes.root__thirdRow_name}>Linkedin</Typography>
              <Typography sx={classes.root__thirdRow_site}>
                linkedin site
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={classes.root__thirdRow_button} />
        </FlexBetween>

        <FlexBetween sx={classes.root__thirdRow__flex}>
          <FlexBetween sx={classes.root__thirdRow__flex__flex}>
            <img alt="twitter" src="../assets/twitter.png" />
            <Box sx={classes.root__thirdRow__flex__flex_Box}>
              <Typography sx={classes.root__thirdRow_name}>Twitter</Typography>
              <Typography sx={classes.root__thirdRow_site}>
                twitter site
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={classes.root__thirdRow_button} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
User.propTypes = {
  userId: PropTypes.string,
  imgPath: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  friendsLength: PropTypes.number,
  location: PropTypes.string,
  occupation: PropTypes.string,
};

export default User;
