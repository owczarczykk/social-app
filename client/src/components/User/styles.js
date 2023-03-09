const styles = (theme) => {
  return {
    classes: {
      root: {
        margin: "0 0 1rem 0",
      },
      root__firstRow: {
        gap: "0.5rem",
        padding: "0 0 1rem 0",
      },
      root__firstRow_fullName: {
        variant: "h4",
        fontWeight: "500",
        color: theme.palette.neutral.main,
        "&:hover": {
          color: theme.palette.primary.light,
          cursor: "pointer",
        },
      },
      root__firstRow_friends: { color: theme.palette.neutral.medium },
      root__firstRow_button: {
        color: theme.palette.neutral.main,
        "&:hover": {
          color: theme.palette.primary.light,
          cursor: "pointer",
        },
      },
      root__secondRow: { padding: "1rem 0" },
      root__secondRow__location: {
        display: "flex",
        gap: "1rem",
        margin: "0 0 1rem 0",
        alignItems: "center",
      },
      root__secondRow_button: {
        fontSize: "35px",
        color: theme.palette.neutral.main,
      },
      root__secondRow_typography: {
        color: theme.palette.neutral.main,
      },
      root__secondRow__work: {
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      },

      root__thirdRow: { padding: "1rem 0" },
      root__thirdRow_typography: {
        fontSize: "1rem",
        color: theme.palette.neutral.main,
        fontWeight: "500",
        margin: "0 0 0.4rem 0",
      },
      root__thirdRow__flex: { gap: "1rem", margin: "0 0 0.5rem 0" },
      root__thirdRow__flex__flex: { gap: "1rem" },
      root__thirdRow__flex__flex_Box: { padding: "0.7rem 1rem" },
      root__thirdRow_name: {
        color: theme.palette.neutral.main,
        fontWeight: "800",
      },
      root__thirdRow_site: {
        color: theme.palette.neutral.main,
      },
      root__thirdRow_button: {
        color: theme.palette.neutral.main,
        "&:hover": {
          color: theme.palette.primary.light,
          cursor: "pointer",
        },
      },
    },
  };
};
export default styles;
