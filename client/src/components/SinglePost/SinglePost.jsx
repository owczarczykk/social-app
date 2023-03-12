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
import { PropTypes } from "prop-types";
import FlexBetween from "components/UI/FlexBetween";

import WidgetWrapper from "components/UI/WidgetWrapper";
import UserImage from "components/UserImage/UserImage";
import { useDispatch } from "react-redux";
import { setPost } from "store";
import { useState, lazy, Suspense } from "react";
import styles from "./styles";
const Friend = lazy(() => import("components/Friend/Friend"));

const SinglePost = ({
  postId,
  postUserId,
  name,
  description,
  location,
  imgPath,
  userImgPath,
  likes,
  comments,
  loggedInUser,
  isProfile,
}) => {
  const theme = useTheme();
  const { classes } = styles(theme);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const isLiked = Boolean(likes[loggedInUser._id]);
  const baseUrl = "https://social-app1.herokuapp.com/";
  const initialValues = {
    comment: "",
    userId: loggedInUser._id,
    name: loggedInUser.name,
    lastName: loggedInUser.lastName,
    imgPath: loggedInUser.imgPath,
  };

  const patchLike = async () => {
    const response = await fetch(`${baseUrl}posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUser._id }),
    });
    const post = await response.json();
    dispatch(setPost({ post: post }));
  };

  const addComment = async (values, onSubmitProps) => {
    const response = await fetch(`${baseUrl}posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const post = await response.json();
    onSubmitProps.resetForm();
    dispatch(setPost({ post: post }));
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await addComment(values, onSubmitProps);
  };

  return (
    <WidgetWrapper sx={classes.root}>
      <Suspense fallback={<div></div>}>
        <Friend
          friendId={postUserId}
          name={name}
          location={location}
          userImgPath={userImgPath}
          loggedInUser={loggedInUser}
          isProfile={isProfile}
        />
      </Suspense>
      <Typography sx={classes.root_description}>{description}</Typography>
      {imgPath && (
        <img
          src={`${baseUrl}assets/${imgPath}`}
          width="100%"
          height="auto"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          alt={imgPath}
        />
      )}
      <FlexBetween sx={classes.root__icons}>
        <FlexBetween gap="1rem">
          <Box
            onClick={() => {
              patchLike();
            }}
          >
            {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}

            <Typography sx={classes.root_icons_typography}>
              {Object.keys(likes).length}
            </Typography>
          </Box>
          <Box>
            <ChatBubbleOutlineOutlined
              onClick={() => {
                setIsCommentClicked(!isCommentClicked);
              }}
            />
            <Typography sx={classes.root_icons_typography}>
              {comments.length}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton sx={classes.root_icons_iconButton}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isCommentClicked && (
        <Box sx={classes.root__comments}>
          {comments.map(({ userId, comment, name, lastName, imgPath }) => (
            <Box key={`${userId}${comment}`}>
              <Divider sx={classes.root__comments_divider} />
              <FlexBetween gap="1rem">
                <FlexBetween gap="1rem">
                  <UserImage imgPath={imgPath} size="35px" />
                  <Typography
                    sx={classes.root__comments_typography}
                  >{` ${name} ${lastName}`}</Typography>
                </FlexBetween>
                <Typography sx={classes.root_comments_typography}>
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
                <Box sx={classes.root__comments_form}>
                  <TextField
                    label="Add new comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.comment}
                    name="comment"
                    sx={classes.root__comments_form_text}
                  />

                  <Button type="submit" sx={classes.root__comments_form_button}>
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

SinglePost.propTypes = {
  postId: PropTypes.string,
  postUserId: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  imgPath: PropTypes.string,
  userImgPath: PropTypes.string,
  likes: PropTypes.objectOf(PropTypes.bool),
  comments: PropTypes.arrayOf(PropTypes.object),
  loggedInUser: PropTypes.object,
  isProfile: PropTypes.bool,
};
export default SinglePost;
