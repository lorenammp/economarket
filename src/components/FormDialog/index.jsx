import "./style.css";

import * as React from "react";

import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FormDialog({ open, setOpen, children }) {
  const closeDialogMenu = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialogMenu}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="formDialog">{children}</DialogContent>
    </Dialog>
  );
}

export default FormDialog;
