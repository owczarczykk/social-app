import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { setFriends, setGlobalFriends } from "store";
import FlexBetween from "../UI/FlexBetween";
import UserImage from "../UserImage/UserImage";
import styles from "./styles";

const Friend = ({
  friendId,
  name,
  location,
  userImgPath,
  loggedInUser,
  userId,
  token,
  isProfile = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { classes } = styles(theme);
  const isFriend = loggedInUser.friends.find(
    (friend) => friend._id === friendId
  );
  const isMe = loggedInUser._id === friendId;
  const baseUrl = "http://localhost:3001/";

  const patchFriends = async () => {
    const response = await fetch(
      `${baseUrl}user/${loggedInUser._id}/${friendId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const friends = await response.json();
    dispatch(setFriends({ friends: friends }));
    dispatch(setGlobalFriends({ friends: friends }));
  };
  const patchFriendsProfile = async () => {
    const response = await fetch(`${baseUrl}user/${userId}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const friends = await response.json();
    dispatch(setFriends({ friends: friends }));
    dispatch(setGlobalFriends({ friends: friends }));
  };

  return (
    <FlexBetween>
      <FlexBetween sx={classes.root}>
        <UserImage imgPath={userImgPath} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          sx={classes.root__box}
        >
          <Typography sx={classes.root__box_name}>{name}</Typography>
          <Typography sx={classes.root__box_location}>{location}</Typography>
        </Box>
      </FlexBetween>

      {!isMe &&
        !isProfile &&
        (isFriend ? (
          <IconButton
            onClick={() => (isProfile ? patchFriendsProfile() : patchFriends())}
            sx={classes.icons}
          >
            <PersonRemoveOutlined sx={classes.icons_personOutlined} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => (isProfile ? patchFriendsProfile() : patchFriends())}
            sx={classes.icons}
          >
            <PersonAddOutlined sx={classes.icons_personOutlined} />
          </IconButton>
        ))}
    </FlexBetween>
  );
};
Friend.propTypes = {
  friendId: PropTypes.string,
  token: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  userImgPath: PropTypes.string,
  userId: PropTypes.string,
  isProfile: PropTypes.bool,
};
export default Friend;
