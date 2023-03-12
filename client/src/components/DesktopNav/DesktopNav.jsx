import {
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
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import FlexBetween from "components/UI/FlexBetween";
import styles from "./styles";
import { setMode, setLogout } from "store";

const DesktopNav = ({ fullName, userId, mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { classes } = styles(theme);

  return (
    <FlexBetween sx={classes.root}>
      <IconButton onClick={() => dispatch(setMode())}>
        {mode === "dark" ? (
          <LightMode sx={classes.root_lightMode} />
        ) : (
          <DarkMode sx={classes.root_darkMode} />
        )}
      </IconButton>
      <Message sx={classes.root_icons} />
      <Notifications sx={classes.root_icons} />
      <Help sx={classes.root_icons} />
      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={classes.root__form_select}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography onClick={() => navigate(`/user/${userId}`)}>
              {fullName}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );
};

DesktopNav.propTypes = {
  fullName: PropTypes.string,
  userId: PropTypes.string,
  mode: PropTypes.string,
};

export default DesktopNav;
