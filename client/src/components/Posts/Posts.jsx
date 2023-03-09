import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { setPosts } from "store";
import SinglePost from "../SinglePost/SinglePost";

const Posts = ({ userId, isProfile = false }) => {
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = "http://localhost:3001/";
  const getPostsCallback = useCallback(async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseJSON = await response.json();
    dispatch(setPosts({ posts: responseJSON }));
  }, [dispatch, token]);

  const getUserPostsCallback = useCallback(async () => {
    const response = await fetch(`${baseUrl}/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }, [dispatch, token, userId]);

  useEffect(() => {
    if (isProfile) {
      getUserPostsCallback().then(() => {
        setIsLoading(false);
      });
    } else {
      getPostsCallback().then(() => {
        setIsLoading(false);
      });
    }
  }, [getUserPostsCallback, getPostsCallback, isProfile]);

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
    <>
      {posts.map(
        ({
          _id,
          userId,
          name,
          lastName,
          description,
          location,
          imgPath,
          userImgPath,
          likes,
          comments,
        }) => (
          <SinglePost
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${name} ${lastName}`}
            description={description}
            location={location}
            imgPath={imgPath}
            userImgPath={userImgPath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

Posts.propTypes = {
  userId: PropTypes.string,
  isProfile: PropTypes.bool,
};

export default Posts;
