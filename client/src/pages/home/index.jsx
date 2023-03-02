import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import User from "pages/widgets/User";
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
          center
        </Box>
        {isNonMobileScreens && <Box flexBasis="25%">right</Box>}
      </Box>
    </Box>
  );
};

export default Home;
