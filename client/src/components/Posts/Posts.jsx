import { useEffect, useCallback, useState, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { setPosts } from "store";
const SinglePost = lazy(() => import("components/SinglePost"));

const Posts = ({ userId, loggedInUser, posts, isProfile = false }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  const baseUrl = "https://social-app1.herokuapp.com/";

  const getPostsCallback = useCallback(async () => {
    const response = await fetch(`${baseUrl}posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts: posts }));
  }, [dispatch, token]);

  const getUserPostsCallback = useCallback(async () => {
    const response = await fetch(`${baseUrl}posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts: posts }));
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
          <Suspense
            key={`${_id} ${userId} ${likes} ${lastName}`}
            fallback={
              <Backdrop
                open={isLoading}
                onClick={() => {
                  setIsLoading(false);
                }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            }
          >
            <SinglePost
              key={`$ ${userId}  ${likes}{_id} ${lastName}`}
              postId={_id}
              postUserId={userId}
              name={`${name} ${lastName}`}
              description={description}
              location={location}
              imgPath={imgPath}
              userImgPath={userImgPath}
              likes={likes}
              comments={comments}
              loggedInUser={loggedInUser}
              isProfile={isProfile}
            />
          </Suspense>
        )
      )}
    </>
  );
};

Posts.propTypes = {
  userId: PropTypes.string,
  isProfile: PropTypes.bool,
  loggedInUser: PropTypes.object,
  posts: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string,
};

export default Posts;
