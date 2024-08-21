import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface ActionProps {
  handleConfirm: () => void;
}

export default function ConfirmAssignment({
    handleConfirm,
}: ActionProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onConfirm = () => {
    handleConfirm();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => handleClickOpen()}>
        <CheckBoxIcon color="success" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-blue-500">
          {"Confirm this assignment is completed?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This data will be marked at fineshed and be moved to history!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onConfirm()} color="success">
            Confirm
          </Button>
          <Button onClick={() => handleClose()} autoFocus color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
