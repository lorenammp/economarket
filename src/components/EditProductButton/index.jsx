import "./style.css";

import { useContext, useState } from "react";

import FormDialog from "../FormDialog";
import EditProductForm from "../EditProductForm";

function EditProductBtn({ product }) {
  const [open, setOpen] = useState(false);

  const handleOpenEditForm = () => {
    setOpen(true);
  };

  return (
    <>
      <button className="editBtn" onClick={handleOpenEditForm}>
        Editar
      </button>

      <FormDialog open={open} setOpen={setOpen}>
        <EditProductForm product={product} />
      </FormDialog>
    </>
  );
}

export default EditProductBtn;
