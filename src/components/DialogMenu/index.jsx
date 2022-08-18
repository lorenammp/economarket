import * as React from "react";

import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import BuildMenuList from "../BuildMenuList";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogMenu({ open, setOpen, menuList }) {
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
      <DialogContent>
        {menuList.map((item, index) => (
          <BuildMenuList key={index} item={item} />
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default DialogMenu;
