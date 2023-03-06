import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import User from "pages/widgets/User";
import Post from "pages/widgets/Post";
import Posts from "pages/widgets/Posts";
import FriendList from "pages/widgets/FriendList";
import Advert from "pages/widgets/Advert";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user);
  const { _id, imgPath } = user;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
          <User userId={_id} imgPath={imgPath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "45%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Post imgPath={imgPath} />
          <Posts userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="25%">
            <Advert />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
