import { useState } from "react";
import {
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/UI/FlexBetween";
import DesktopNav from "../../components/DesktopNav/DesktopNav";
import MobileNav from "../../components/MobileNav/MobileNav";
import styles from "./styles";
const Navbar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { classes } = styles(theme);
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const fullName = `${user.name} ${user.lastName}`;

  return (
    <FlexBetween sx={classes.navbar}>
      <FlexBetween sx={classes.navbar__flex}>
        <Typography
          onClick={() => navigate("/home")}
          sx={classes.navbar__flex_typography}
        >
          Social-app
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween sx={classes.navbar__flex_search}>
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Nav */}
      {isNonMobileScreens ? (
        <DesktopNav fullName={fullName} userId={user._id} mode={mode} />
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <MobileNav
          mode={mode}
          fullName={fullName}
          onClose={setIsMobileMenuToggled}
          isMobileMenuToggled={isMobileMenuToggled}
        />
      )}
    </FlexBetween>
  );
};

export default Navbar;
