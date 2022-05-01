import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import ActionButton from "./Controls/ActionButton";
import CloseIcon from "@material-ui/icons/Close";

const PopUp = (props: any) => {
  const { title, children, openPopUp, setOpenPopUp } = props;
  // @ts-ignore

  return (
    <Dialog
      style={{
        width: "100%",
        margin: "0 auto",
      }}
      open={openPopUp}
      fullScreen
    >
      <DialogTitle style={{}}>
        <div
          style={{
            display: "flex",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            style={{
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
          <ActionButton color="secondary" onClick={() => setOpenPopUp(false)}>
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default PopUp;
