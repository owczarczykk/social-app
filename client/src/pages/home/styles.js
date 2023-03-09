const styles = (theme, MediaQuery) => {
  return {
    classes: {
      root: {
        width: "100%",
        padding: "2rem 6%",
        display: MediaQuery ? "flex" : "block",
      },
      root_leftSection: { flexBasis: MediaQuery ? "25%" : undefined },
      root_center: {
        flexBasis: MediaQuery ? "45%" : undefined,
        mt: MediaQuery ? undefined : "2rem",
      },
      root_rightSection: { flexBasis: "25%" },
    },
  };
};
export default styles;
