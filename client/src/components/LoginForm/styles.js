const styles = (theme, mediaQuery) => {
  return {
    classes: {
      root: {
        display: "grid",
        gap: "30px",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        "& > div": {
          gridColumn: mediaQuery ? undefined : "span 4",
        },
      },
      root__box: {
        gridColumn: "span 4",
        border: `1px solid ${theme.palette.neutral.medium}`,
        borderRadius: "5px",
        padding: "1rem",
      },
      root__box_box: {
        "&:hover": { cursor: "pointer" },
        border: `2px dashed ${theme.palette.primary.main}`,
        padding: "1rem",
      },
      root_valuesRegister: {
        gridColumn: "span 2",
        " .MuiFormHelperText-root": {
          fontSize: "19px",
          margin: "0.2rem 0 0 0",
        },
      },
      root_valuesLogin: {
        gridColumn: "span 4",
        " .MuiFormHelperText-root": {
          fontSize: "19px",
          margin: "0.2rem 0 0 0",
        },
      },
      buttons: {
        margin: "2rem 0",
        padding: "1rem",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.alt,
        "&:hover": { color: theme.palette.primary.main },
      },
      typography: {
        textDecoration: "underline",
        color: theme.palette.primary.main,
        "&:hover": {
          cursor: "pointer",
          color: theme.palette.primary.light,
        },
      },
    },
  };
};
export default styles;
