import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useToast } from "./Toastify";
import { TypeTreeRes } from "../interfaces/Response/TypeTree/TypeTreeRes";
import { updateTypeTree } from "../services/TypeTreeApi";
import { QueryObserverResult } from "@tanstack/react-query";

interface ActionProps {
  type: TypeTreeRes;
  handleFetch: () => Promise<QueryObserverResult<TypeTreeRes[], Error>>;
}

export default function EditTypeTreeDialogForm({
  type,
  handleFetch,
}: ActionProps) {
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const [typeTreeValue, setTypeTreeValue] = React.useState<string>(type.name);
  const [validate, setvalidate] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTypeTreeValue(type.name);
    setvalidate("");
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (typeTreeValue !== "") {
      setvalidate("");
      type = {
        id: type.id,
        name: typeTreeValue,
        listTrees: type.listTrees,
      };
      var res = await updateTypeTree(type.id, type, token);
      if (res.isSuccess) {
        await handleFetch();
        showToast("Successful!", "success");
        handleClose();
      } else {
        showToast(`${res.message}`, "error");
      }
    } else {
      setvalidate("Type name is required!");
    }
  };

  React.useEffect(() => {
    setTypeTreeValue(type.name);
  }, [type]);

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={() => handleClickOpen()}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update type tree</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Type name"
            defaultValue={typeTreeValue}
            type="text"
            fullWidth
            variant="standard"
            error={!!validate}
            helperText={validate}
            onChange={(e) => {
              setTypeTreeValue(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={() => handleSubmit()}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
