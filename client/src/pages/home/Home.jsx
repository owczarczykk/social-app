import { Suspense, lazy } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "pages/navbar";
import AddPost from "components/AddPost";
import Advert from "components/Advert";
import { useSelector } from "react-redux";
import styles from "./styles";
import { PropTypes } from "prop-types";
const Posts = lazy(() => import("components/Posts"));
const User = lazy(() => import("components/User"));
const FriendList = lazy(() => import("components/FriendList"));
const Home = () => {
  const loggedInUser = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const friendsState = useSelector((state) => state.friends);
  const { _id, imgPath, name, lastName, friends, location, occupation } =
    loggedInUser;
  const friendsLength = friends.length;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const { classes } = styles(theme, isNonMobileScreens);

  return (
    <Box>
      <Navbar />
      <Box gap="1rem" justifyContent="space-between" sx={classes.root}>
        <Box sx={classes.root_leftSection}>
          <Suspense fallback={<div></div>}>
            <User
              userId={_id}
              imgPath={imgPath}
              name={name}
              lastName={lastName}
              friendsLength={friendsLength}
              location={location}
              occupation={occupation}
            />
          </Suspense>
        </Box>

        <Box sx={classes.root_center}>
          <Suspense fallback={<div></div>}>
            <AddPost imgPath={imgPath} user={loggedInUser} />
            <Posts idUser={_id} loggedInUser={loggedInUser} posts={posts} />
          </Suspense>
        </Box>

        {isNonMobileScreens && (
          <Box sx={classes.root_rightSection}>
            <Advert />
            <Suspense fallback={<div></div>}>
              <FriendList
                userId={_id}
                loggedInUser={loggedInUser}
                friends={friendsState}
              />
            </Suspense>
          </Box>
        )}
      </Box>
    </Box>
  );
};
Home.propTypes = {
  isProfile: PropTypes.bool,
};
export default Home;
