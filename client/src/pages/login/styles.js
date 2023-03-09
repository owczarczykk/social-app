const styles = (theme, MediaQuery) => {
  return {
    classes: {
      navbar: {
        padding: "1rem",
        textAlign: "center",
        width: "100%",
        backgroundColor: theme.palette.background.alt,
      },
      navbar__typography: {
        fontWeight: "bold",
        fontSize: "32px",
        color: theme.palette.primary.main,
      },
      content: {
        width: MediaQuery ? "50%" : "90%",
        padding: "2rem",
        margin: "3rem auto",
        borderRadius: "1.5rem",
        backgroundColor: theme.palette.background.alt,
      },
      content__typography: {
        fontWeight: "500",
        variant: "h5",
        mb: "1.5rem",
        textAlign: "center",
      },
    },
  };
};
export default styles;
