import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
  (theme: {
    spacing: (arg0: number) => any;
    palette: {
      secondary: { light: any; main: any };
      primary: { light: any; main: any };
    };
  }) => ({
    root: {
      minWidth: 0,
      margin: theme.spacing(1),
    },
    secondary: {
      backgroundColor: theme.palette.secondary.light,
      "& .MuiButton-label": {
        color: theme.palette.secondary.main,
      },
    },
    primary: {
      backgroundColor: theme.palette.primary.light,
      "& .MuiButton-label": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default function ActionButton(props: any) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    // @ts-ignore
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}
