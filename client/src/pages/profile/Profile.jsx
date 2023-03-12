import { Suspense, lazy } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "pages/navbar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles";
import { useParams } from "react-router";
const Posts = lazy(() => import("components/Posts"));
const User = lazy(() => import("components/User"));
const FriendList = lazy(() => import("components/FriendList"));
const Profile = () => {
  const [user, setUser] = useState(null);
  const { userIdProfile } = useParams();
  const token = window.localStorage.getItem("token");
  const posts = useSelector((state) => state.posts);

  const loggedInUser = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const { classes } = styles(theme, isNonMobileScreens);
  const baseUrl = "https://social-app1.herokuapp.com/";
  const getUser = async () => {
    const response = await fetch(`${baseUrl}user/${userIdProfile}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) return null;
  const { imgPath, name, lastName, location, occupation } = user;
  const friendsLength = friends.length;
  return (
    <Box>
      <Navbar />
      <Box sx={classes.root}>
        <Box sx={classes.root_leftSection}>
          <Suspense fallback={<div></div>}>
            <User
              userId={userIdProfile}
              imgPath={imgPath}
              name={name}
              lastName={lastName}
              friendsLength={friendsLength}
              location={location}
              occupation={occupation}
            />
            <FriendList
              userId={userIdProfile}
              loggedInUser={loggedInUser}
              isProfile={true}
              friends={friends}
            />
          </Suspense>
        </Box>
        <Box sx={classes.root_center}>
          <Suspense fallback={<div></div>}>
            <Posts
              userId={userIdProfile}
              isProfile={true}
              loggedInUser={loggedInUser}
              posts={posts}
            />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
