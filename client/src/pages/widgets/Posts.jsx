import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { setPosts } from "store";
import SinglePostWidget from "./SinglePostWidget";

const Posts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPostsCallback = useCallback(async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }, [dispatch, token]);

  const getUserPostsCallback = useCallback(async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
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
          <SinglePostWidget
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
export default Posts;
