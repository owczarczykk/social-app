import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SinglePostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  imgPath,
  userImgPath,
  likes,
  comments,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isLiked = Boolean(likes[user._id]);
  const initialValues = {
    comment: "",
    userId: user._id,
    name: user.name,
    lastName: user.lastName,
    imgPath: user.imgPath,
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });
    const data = await response.json();
    dispatch(setPost({ post: data }));
  };

  const addComment = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    onSubmitProps.resetForm();
    dispatch(setPost({ post: data }));
    navigate("/home");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await addComment(values, onSubmitProps);
  };

  return (
    <WidgetWrapper margin="1rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        location={location}
        userImgPath={userImgPath}
      />
      <Typography padding="1rem 0" color={theme.palette.neutral.main}>
        {description}
      </Typography>
      {imgPath && (
        <img
          src={`http://localhost:3001/assets/${imgPath}`}
          width="100%"
          height="auto"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          alt={imgPath}
        />
      )}
      <FlexBetween padding="0.5rem 0">
        <FlexBetween gap="1rem">
          <Box
            onClick={() => {
              patchLike();
            }}
          >
            {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}

            <Typography color={theme.palette.neutral.dark}>
              {Object.keys(likes).length}
            </Typography>
          </Box>
          <Box>
            <ChatBubbleOutlineOutlined
              onClick={() => {
                setIsCommentClicked(!isCommentClicked);
              }}
            />
            <Typography color={theme.palette.neutral.dark}>
              {comments.length}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          sx={{ backgroundColor: theme.palette.primary.light, p: "0.6rem" }}
        >
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isCommentClicked && (
        <Box padding="0.5rem 0">
          {comments.map(({ userId, comment, name, lastName, imgPath }) => (
            <Box key={`${userId}${comment}`}>
              <Divider
                sx={{
                  margin: "0.5rem 0 0.5rem 0",
                  backgroundColor: theme.palette.neutral.light,
                }}
              />
              <FlexBetween gap="1px">
                <FlexBetween gap="1rem">
                  <UserImage imgPath={imgPath} size="35px" />
                  <Typography
                    color={theme.palette.neutral.dark}
                  >{` ${name} ${lastName}`}</Typography>
                </FlexBetween>
                <Typography color={theme.palette.neutral.dark}>
                  {comment}
                </Typography>
              </FlexBetween>
            </Box>
          ))}
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" margin="1rem 0">
                  <TextField
                    label="Add new comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.comment}
                    name="comment"
                    sx={{ width: "100%", color: theme.palette.background.alt }}
                  />

                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.alt,
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </WidgetWrapper>
  );
};
export default SinglePostWidget;
