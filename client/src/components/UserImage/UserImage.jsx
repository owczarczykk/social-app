import { Box } from "@mui/material";
import PropTypes from "prop-types";
const baseUrl = "http://localhost:3001/";
const UserImage = ({ imgPath, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${baseUrl}assets/${imgPath}`}
      />
    </Box>
  );
};
UserImage.propTypes = {
  imgPath: PropTypes.string,
  size: PropTypes.string,
};
export default UserImage;
