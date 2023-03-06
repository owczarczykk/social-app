import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "store";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const Friend = ({ friendId, name, location, userImgPath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isFriend = user.friends.find((friend) => friend._id === friendId);
  const me = friendId === user._id;

  const patchFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${user._id}/${friendId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();

    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage imgPath={userImgPath} />
        <Box
          padding="0.1rem 0.3rem"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <Typography
            color={theme.palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: theme.palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={theme.palette.neutral.medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>

      {!me &&
        (isFriend ? (
          <IconButton
            onClick={() => patchFriends()}
            sx={{
              backgroundColor: theme.palette.primary.light,
              padding: "0.6rem",
              margin: "0 0.5rem",
            }}
          >
            <PersonRemoveOutlined sx={{ color: theme.palette.primary.dark }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => patchFriends()}
            sx={{
              backgroundColor: theme.palette.primary.light,
              padding: "0.6rem",
              margin: "0 0.5rem",
            }}
          >
            <PersonAddOutlined sx={{ color: theme.palette.primary.dark }} />
          </IconButton>
        ))}
    </FlexBetween>
  );
};
export default Friend;
