import { Box, Typography, CircularProgress, useTheme } from "@mui/material";

import WidgetWrapper from "components/UI/WidgetWrapper";
import Friend from "components/Friend/Friend";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setFriends } from "store";
import Backdrop from "@mui/material/Backdrop";
import styles from "./styles";
const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const { classes } = styles(theme);
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);
  const isFriendsEmpty = Boolean(friends.length === 0);
  const baseUrl = "http://localhost:3001/";
  const getFriendsCallback = useCallback(async () => {
    const response = await fetch(`${baseUrl}user/${userId}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const friends = await response.json();
    dispatch(setFriends({ friends: friends }));
  }, [dispatch, token, userId]);

  useEffect(() => {
    getFriendsCallback().then(() => {
      setIsLoading(false);
    });
  }, [getFriendsCallback]);

  if (isLoading)
    return (
      <Backdrop
        open={isLoading}
        onClick={() => {
          setIsLoading(false);
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <WidgetWrapper>
      <Typography sx={classes.typography}>Friends</Typography>
      <Box sx={classes.box}>
        {!isFriendsEmpty && !isLoading ? (
          friends.map(({ _id, name, lastName, location, imgPath }) => (
            <Friend
              key={`${_id}${name}${lastName}`}
              friendId={_id}
              userImgPath={imgPath}
              location={location}
              name={`${name} ${lastName}`}
            />
          ))
        ) : (
          <Typography sx={classes.typography}> No friends</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};
FriendList.propTypes = {
  userId: PropTypes.string,
};
export default FriendList;
