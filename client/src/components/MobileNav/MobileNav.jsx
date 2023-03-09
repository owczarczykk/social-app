import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "store";
import FlexBetween from "components/UI/FlexBetween";
import styles from "./styles";

const MobileNav = ({ fullName, onClose, isMobileMenuToggled, mode }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { classes } = styles(theme);

  return (
    <Box sx={classes.icon}>
      <Box sx={classes.icon_button}>
        <IconButton onClick={() => onClose(!isMobileMenuToggled)}>
          <Close />
        </IconButton>
      </Box>

      <FlexBetween sx={classes.flex}>
        <IconButton onClick={() => dispatch(setMode())} sx={classes.flex_icons}>
          {mode === "dark" ? (
            <LightMode sx={classes.flex_icons} />
          ) : (
            <DarkMode sx={classes.flex_icons} />
          )}
        </IconButton>
        <Message sx={classes.flex_icons} />
        <Notifications sx={classes.flex_icons} />
        <Help sx={classes.flex_icons} />
        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={classes.flex__form_select}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    </Box>
  );
};

MobileNav.propTypes = {
  fullName: PropTypes.string,
  onClose: PropTypes.func,
  isMobileMenuToggled: PropTypes.bool,
  mode: PropTypes.string,
};
export default MobileNav;
