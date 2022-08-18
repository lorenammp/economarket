import * as React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import FormDialog from "../FormDialog";
import EditConsumerForm from "../EditConsumerForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConsumerDashboardMenu({ open, setOpen, menuList }) {
  const navigate = useNavigate();

  const closeDialogMenu = () => {
    setOpen(false);
  };

  const [openForm, setOpenForm] = useState(false);

  const handleOpenDialogForm = () => {
    setOpenForm(true);
  };

  const navigateToReserved = () => {
    navigate("/consumer/reserved");
  };

  const navigateToWishlist = () => {
    navigate("/wishlist");
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
        <div className="menuListItem" onClick={handleOpenDialogForm}>
          {menuList[0]}
        </div>
        <FormDialog open={openForm} setOpen={setOpenForm}>
          <EditConsumerForm />
        </FormDialog>

        {menuList[1] === "Wishlist" ? (
          <div className="menuListItem" onClick={navigateToWishlist}>
            {menuList[1]}
          </div>
        ) : (
          <div className="menuListItem" onClick={navigateToReserved}>
            {menuList[1]}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ConsumerDashboardMenu;
