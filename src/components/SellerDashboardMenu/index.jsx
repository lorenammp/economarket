import * as React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import FormDialog from "../FormDialog";
import EditSellerForm from "../EditSellerForm";
import ProductForm from "../ProductForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SellerDashboardMenu({ open, setOpen, menuList }) {
  const navigate = useNavigate();

  const closeDialogMenu = () => {
    setOpen(false);
  };

  const [openForm, setOpenForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);

  const handleOpenDialogForm = () => {
    setOpenForm(true);
  };

  const handleOpenProductForn = () => {
    setOpenProductForm(true);
  };

  const navigateToReserved = () => {
    navigate("/seller/reserved");
  };

  const navigateToDashboard = () => {
    navigate("/seller/dashboard");
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
        <div className="menuListItem" onClick={handleOpenProductForn}>
          {menuList[0]}
        </div>
        <FormDialog open={openProductForm} setOpen={setOpenProductForm}>
          <ProductForm />
        </FormDialog>

        <div className="menuListItem" onClick={handleOpenDialogForm}>
          {menuList[1]}
        </div>
        <FormDialog open={openForm} setOpen={setOpenForm}>
          <EditSellerForm />
        </FormDialog>

        {menuList[2] === "Meus Produtos" ? (
          <div className="menuListItem" onClick={navigateToDashboard}>
            {menuList[2]}
          </div>
        ) : (
          <div className="menuListItem" onClick={navigateToReserved}>
            {menuList[2]}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SellerDashboardMenu;
