import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "pages/navbar";
import User from "components/User";
import AddPost from "components/AddPost";
import Posts from "components/Posts";
import FriendList from "components/FriendList";
import Advert from "components/Advert";
import { useSelector } from "react-redux";
import styles from "./styles";
import { PropTypes } from "prop-types";
const Home = ({ isProfile = false }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const { _id, imgPath, name, lastName, friends, location, occupation } = user;
  const friendsLength = friends.length;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const { classes } = styles(theme, isNonMobileScreens);

  return (
    <Box>
      <Navbar />
      <Box
        gap={isProfile ? "5rem" : "1rem"}
        justifyContent={isProfile ? "center" : "space-between"}
        sx={classes.root}
      >
        <Box sx={classes.root_leftSection}>
          <User
            userId={_id}
            imgPath={imgPath}
            name={name}
            lastName={lastName}
            friendsLength={friendsLength}
            location={location}
            occupation={occupation}
          />
          {isProfile && <FriendList userId={_id} />}
        </Box>
        <Box sx={classes.root_center}>
          <AddPost imgPath={imgPath} user={user} token={token} />
          {isProfile ? (
            <Posts
              userId={_id}
              isProfile={isProfile}
              // token={token}
              // posts={posts}
            />
          ) : (
            <Posts userId={_id} />
          )}
        </Box>
        {isNonMobileScreens && !isProfile && (
          <Box sx={classes.root_rightSection}>
            <Advert />
            <FriendList userId={_id} />
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
