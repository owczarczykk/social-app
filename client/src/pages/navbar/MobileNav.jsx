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
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "store";
import FlexBetween from "components/FlexBetween";

const MobileNav = ({ fullName, onClose, isMobileMenuToggled }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;

  return (
    <Box
      sx={{
        position: "fixed",
        right: "0",
        bottom: "0",
        height: "100%",
        zIndex: "10",
        maxWidth: "500px",
        minWidth: "300px",
        backgroundColor: { background },
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
      >
        <IconButton onClick={() => onClose(!isMobileMenuToggled)}>
          <Close />
        </IconButton>
      </Box>

      <FlexBetween
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ fontSize: "25px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
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
    </Box>
  );
};

export default MobileNav;
