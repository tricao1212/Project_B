import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { QueryObserverResult } from "@tanstack/react-query";
import { sendRequestConfirm } from "../services/AssignmentApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useToast } from "./Toastify";

interface Props {
  assignmentId: string;
  handleFetch: () => Promise<QueryObserverResult<any, Error>>;
}

const SendRequestConfirm = ({ assignmentId, handleFetch }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();

  const handleSend = async () => {
    console.log(token);
    const res = await sendRequestConfirm(assignmentId, token);
    if (res.isSuccess) {
      showToast("Successful!", "success");
      await handleFetch();
      setOpen(false);
    } else {
      showToast(res.message, "error");
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleOpenDialog}>
        <CheckBoxIcon color="success" />
      </IconButton>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Send confirm request</DialogTitle>
        <hr />
        <DialogContent>Make sure you finished all job !!!</DialogContent>
        <DialogActions>
          <Button onClick={handleSend} color="success">
            Send
          </Button>
          <Button onClick={handleCloseDialog} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendRequestConfirm;
