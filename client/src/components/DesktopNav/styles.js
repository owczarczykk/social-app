const styles = (theme) => {
  return {
    classes: {
      root: {
        gap: "2rem",
        padding: "0rem 1rem",
        margin: "0 0 0 1rem",
      },
      root_darkMode: { fontSize: "25px" },
      root_lightMode: { color: theme.palette.neutral.dark, fontSize: "25px" },
      root_icons: {
        fontSize: "25px",
        "&:hover": {
          cursor: "pointer",
        },
      },
      root__form_select: {
        backgroundColor: theme.palette.neutral.light,
        width: "100%",
        height: "auto",
        borderRadius: "0.25rem",
        padding: "0.25rem 1rem",
        "& .MuiSvgIcon-root": {
          pr: "0.25rem",
          width: "3rem",
        },
        "& .MuiSelect-select:focus": {
          backgroundColor: theme.palette.neutral.light,
        },
      },
    },
  };
};
export default styles;
