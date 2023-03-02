import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const User = ({ userId, imgPath }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await response.json();
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return;

  const buttonSx = {
    color: theme.palette.neutral.main,
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  };

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        padding="0 0 1rem 0"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage imgPath={imgPath} />
          <Box>
            <Typography variant="h4" fontWeight="500" sx={buttonSx}>
              {user.name} {user.lastName}
            </Typography>
            <Typography color={theme.palette.neutral.medium}>
              {user.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={buttonSx} />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" gap="1rem" margin="0 0 1rem 0" alignItems="center">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: theme.palette.neutral.main }}
          />
          <Typography color={theme.palette.neutral.main}>
            {user.location}
          </Typography>
        </Box>
        <Box display="flex" gap="1rem" alignItems="center">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{ color: theme.palette.neutral.main }}
          />
          <Typography color={theme.palette.neutral.main}>
            {user.location}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={theme.palette.neutral.main}
          fontWeight="500"
          margin="0 0 0.4rem 0"
        >
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" margin="0 0 0.5rem 0">
          <FlexBetween gap="1rem">
            <img alt="linkedin" src="../assets/linkedin.png" />
            <Box padding="0.7rem 1rem">
              <Typography color={theme.palette.neutral.main} fontWeight="800">
                Linkedin
              </Typography>
              <Typography color={theme.palette.neutral.main}>
                linkedin site
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={buttonSx} />
        </FlexBetween>

        <FlexBetween gap="1rem" margin="0 0 0.5rem 0">
          <FlexBetween gap="1rem">
            <img alt="twitter" src="../assets/twitter.png" />
            <Box padding="0.7rem 1rem">
              <Typography color={theme.palette.neutral.main} fontWeight="800">
                Twitter
              </Typography>
              <Typography color={theme.palette.neutral.main}>
                twitter site
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={buttonSx} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default User;
