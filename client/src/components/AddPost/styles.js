const styles = (theme) => {
  return {
    classes: {
      inputBase: {
        gap: "1rem",
      },
      inputBase_inputBase: {
        width: "100%",
        backgroundColor: theme.palette.neutral.light,
        borderRadius: "2rem",
        padding: "1rem 2rem",
      },
      image: {
        borderRadius: "1rem",
        border: `0.1rem solid ${theme.palette.neutral.light}`,
        width: "100%",
        padding: "1rem 1rem",
        margin: "1rem 0",
      },
      image__box: {
        width: "100%",
        "&:hover": { cursor: "pointer" },
        border: `2px dashed ${theme.palette.primary.main}`,
        p: "1rem",
      },
      image__icon: { width: "15%" },
      divider: {},
      icons: { color: theme.palette.neutral.mediumMain },
      icons_typography: {
        color: theme.palette.neutral.mediumMain,
        "&:hover": {
          cursor: "pointer",
          color: theme.palette.neutral.medium,
        },
      },
      button: {
        color: theme.palette.background.alt,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "3rem",
      },
    },
  };
};
export default styles;
