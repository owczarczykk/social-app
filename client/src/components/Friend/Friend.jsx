import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { setFriends } from "store";
import FlexBetween from "../UI/FlexBetween";
import UserImage from "../UserImage/UserImage";
import styles from "./styles";

const Friend = ({ friendId, name, location, userImgPath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { classes } = styles(theme);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isFriend = user.friends.find((friend) => friend._id === friendId);
  const me = friendId === user._id;
  const baseUrl = "http://localhost:3001/";

  const patchFriends = async () => {
    const response = await fetch(`${baseUrl}user/${user._id}/${friendId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    });
    const responseJson = await response.json();

    dispatch(setFriends({ friends: responseJson }));
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

      {!me &&
        (isFriend ? (
          <IconButton onClick={() => patchFriends()} sx={classes.icons}>
            <PersonRemoveOutlined sx={classes.icons_personOutlined} />
          </IconButton>
        ) : (
          <IconButton onClick={() => patchFriends()} sx={classes.icons}>
            <PersonAddOutlined sx={classes.icons_personOutlined} />
          </IconButton>
        ))}
    </FlexBetween>
  );
};
Friend.propTypes = {
  friendId: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  userImgPath: PropTypes.string,
};
export default Friend;
