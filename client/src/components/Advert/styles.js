const styles = (theme) => {
  return {
    classes: {
      root: {
        margin: "0 0 1rem 0",
      },
      root__flex: {
        margin: "0 0 0.5rem 0",
      },
      root__flex_sponsored: {
        color: theme.palette.neutral.dark,
        variant: "h5",
        fontWeight: "500",
      },
      root__flex_ad: {
        color: theme.palette.neutral.medium,
        "&:hover": { cursor: "pointer" },
      },
      root_description: {
        color: theme.palette.neutral.medium,
        margin: "0.5rem 0",
        textAlign: "center",
      },
      root_site: { color: theme.palette.neutral.medium, textAlign: "center" },
    },
  };
};
export default styles;
