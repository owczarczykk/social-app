const styles = (theme) => {
  return {
    classes: {
      icon: {
        position: "fixed",
        right: "0",
        bottom: "0",
        height: "100%",
        zIndex: "10",
        maxWidth: "500px",
        minWidth: "300px",
        backgroundColor: theme.palette.background.default,
      },
      icon_button: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "1rem",
      },
      flex: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      },
      flex_icons: {
        fontSize: "25px",
        color: theme.palette.neutral.dark,
      },
      flex__form_select: {
        backgroundColor: theme.palette.neutral.light,
        width: "150px",
        borderRadius: "0.25rem",
        padding: "0.25rem 1rem",
        "& .MuiSvgIcon-root": {
          pr: "0.25rem",
          width: "3rem",
        },
        "& .MuiSelect-select:focus": {
          backgroundColor: theme.palette.neutral.light,
        },
      },
    },
  };
};
export default styles;
