const styles = (theme) => {
  return {
    classes: {
      root: {
        margin: "1rem 0",
      },
      root_description: {
        padding: "1rem 0",
        color: theme.palette.neutral.main,
      },
      root__icons: { padding: "0.5rem 0" },
      root_icons_typography: { color: theme.palette.neutral.dark },
      root_icons_iconButton: {
        backgroundColor: theme.palette.primary.light,
        padding: "0.6rem",
      },
      root__comments: { padding: "0.5rem 0" },
      root__comments_divider: {
        margin: "0.5rem 0 0.5rem 0",
        backgroundColor: theme.palette.neutral.light,
      },
      root__comments_typography: { color: theme.palette.neutral.dark },
      root__comments_form: { display: "flex", margin: "1rem 0" },
      root__comments_form_text: {
        width: "100%",
        color: theme.palette.background.alt,
        "& fieldset": {
          borderRadius: "0.5rem 0 0 0.5rem",
        },
      },
      root__comments_form_button: {
        borderRadius: "0 0.5rem 0.5rem 0 ",
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.neutral.main,
        "&:hover": { color: theme.palette.primary.main },
      },
    },
  };
};
export default styles;
