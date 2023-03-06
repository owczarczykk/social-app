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
import { setMode, setLogout } from "store";

import FlexBetween from "components/FlexBetween";

const DesktopNav = ({ fullName }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;

  return (
    <FlexBetween sx={{ gap: "2rem" }}>
      <IconButton onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
      <Message
        sx={{
          fontSize: "25px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      ></Message>
      <Notifications
        sx={{
          fontSize: "25px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      ></Notifications>
      <Help
        sx={{
          fontSize: "25px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      ></Help>
      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            width: "100%",
            height: "auto",
            borderRadius: "0.25rem",
            padding: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );
};

export default DesktopNav;
