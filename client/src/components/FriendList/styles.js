const styles = (theme) => {
  return {
    classes: {
      typography: {
        color: theme.palette.neutral.dark,
        variant: "h5",
        fontWeight: "500",
        fontSize: "17px",
        mb: "1rem",
      },
      box: { display: "flex", flexDirection: "column", gap: "1.5rem" },
    },
  };
};
export default styles;
