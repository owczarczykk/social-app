import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import WidgetWrapper from "components/UI/WidgetWrapper";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setGlobalFriends } from "store";
import Backdrop from "@mui/material/Backdrop";
import styles from "./styles";
const Friend = lazy(() => import("components/Friend"));
const FriendList = ({
  userId,
  token,
  friends,
  loggedInUser,
  isProfile = false,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const { classes } = styles(theme);
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
    dispatch(setGlobalFriends({ friends: friends }));
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
            <Suspense
              key={`${_id} ${imgPath} `}
              fallback={<div>Loading...</div>}
            >
              <Friend
                key={`${_id}${name}${lastName}`}
                friendId={_id}
                userImgPath={imgPath}
                location={location}
                name={`${name} ${lastName}`}
                loggedInUser={loggedInUser}
                userId={userId}
                isProfile={isProfile}
              />
            </Suspense>
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
  loggedInUser: PropTypes.object,
  isProfile: PropTypes.bool,
  token: PropTypes.string,
  friends: PropTypes.arrayOf(PropTypes.object),
};
export default FriendList;
