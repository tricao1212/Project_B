import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionProps {
  id: string
  handleDelete: (id: string) => void
}

const DeleteConfirm = ({id, handleDelete} : ActionProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onDedelete = () => {
    handleDelete(id);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="delete" onClick={() => handleClickOpen()}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This data will be deleted and cannot restore!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDedelete()} color="error">Delete</Button>
          <Button onClick={() => handleClose()} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteConfirm;
