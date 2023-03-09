const styles = (theme) => {
  return {
    classes: {
      root: {
        gap: "1rem",
      },
      root__box: { "&:hover": { cursor: "pointer" }, padding: "0.1rem 0.3rem" },
      root__box_name: {
        color: theme.palette.neutral.main,
        variant: "h5",
        fontWeight: "500",
        "&:hover": {
          cursor: "pointer",
        },
      },
      root__box_location: {
        color: theme.palette.neutral.medium,
        fontSize: "0.75rem",
      },
      icons: {
        backgroundColor: theme.palette.primary.light,
        padding: "0.6rem",
        margin: "0 0.5rem",
      },
      icons_personOutlined: { color: theme.palette.primary.dark },
    },
  };
};
export default styles;
