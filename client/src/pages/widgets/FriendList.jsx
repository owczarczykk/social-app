import { Box, Typography, CircularProgress, useTheme } from "@mui/material";

import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "store";
import Backdrop from "@mui/material/Backdrop";

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);
  const isFriendsEmpty = Boolean(friends.length === 0);

  const getFriendsCallback = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3001/user/${userId}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
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
      <Typography
        color={theme.palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1rem" }}
      >
        {" "}
        Friends{" "}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
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
          <Typography> No friends</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendList;
