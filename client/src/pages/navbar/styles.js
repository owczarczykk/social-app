const styles = (theme) => {
  return {
    classes: {
      navbar: {
        padding: "1rem 6%",
        backgroundColor: theme.palette.background.alt,
      },
      navbar__flex: { gap: "1.75rem", width: "100%" },
      navbar__flex_typography: {
        fontWeight: "bold",
        fontSize: "clamp(1rem, 2rem, 2.25rem)",
        color: "lightblue",
        width: "100%",
        height: "auto",
        "&:hover": {
          color: theme.palette.neutral.light,
          cursor: "pointer",
        },
      },
      navbar__flex_search: {
        backgroundColor: theme.palette.neutral.light,
        borderRadius: "9px",
        gap: "3rem",
        padding: "0.1rem 1.5rem",
        width: "100%",
      },
    },
  };
};
export default styles;
