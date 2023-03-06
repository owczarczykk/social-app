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
import FlexBetween from "components/FlexBetween";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const fullName = `${user.name} ${user.lastName}`;

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={theme.palette.background.alt}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            width: "100%",
            height: "auto",
            "&:hover": {
              color: theme.palette.neutral.light,
              cursor: "pointer",
            },
          }}
        >
          Social-app
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={theme.palette.neutral.light}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Nav */}
      {isNonMobileScreens ? (
        <DesktopNav fullName={fullName} />
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <MobileNav
          fullName={fullName}
          onClose={setIsMobileMenuToggled}
          isMobileMenuToggled={isMobileMenuToggled}
        />
      )}
    </FlexBetween>
  );
};

export default Navbar;
