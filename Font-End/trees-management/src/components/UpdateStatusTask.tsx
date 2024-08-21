import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { AssignmentRes } from "../interfaces/Response/Assignment/AssignmentRes";
import { WorkContentRes } from "../interfaces/Response/WorkContent/WorkContentRes";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import { getTreeById } from "../services/TreeApi";
import { QueryObserverResult } from "@tanstack/react-query";
import { updateAssignment } from "../services/AssignmentApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useToast } from "./Toastify";

interface Props {
  assignment: AssignmentRes;
  handleFetch: () => Promise<QueryObserverResult<AssignmentRes[], Error>>;
}

const UpdateStatusTask = ({ assignment, handleFetch }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tree, setTree] = useState<TreeRes>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [workContents, setWorkContents] = useState<WorkContentRes[]>(
    assignment.workContent
  );
  const { showToast } = useToast();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const fetchTree = async () => {
    const res = await getTreeById(assignment.treeId);
    setTree(res.data);
  };

  useEffect(() => {
    fetchTree();
  }, [assignment]);

  useEffect(() => {
    setWorkContents(assignment.workContent);
  }, [assignment.workContent]);

  const handleSave = async () => {
    assignment.workContent = workContents;
    console.log(assignment);
    const res = await updateAssignment(assignment.id, assignment, token);
    console.log(res);
    if (res.isSuccess) {
      showToast("Successful!", "success");
      await handleFetch();
      setOpen(false);
    } else {
      showToast(res.data.message, "error");
    }
  };

  const handleToggleComplete = (workId: string) => {
    setIsCheck(true);
    setWorkContents((prevWorkContents) =>
      prevWorkContents.map((work) =>
        work.id === workId
          ? { ...work, status: work.status === 0 ? 1 : 0 }
          : work
      )
    );
  };

  const handleOpenDialog = () => {
    setIsCheck(false);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    if (isCheck) {
      setOpenConfirmation(true);
    } else {
      setOpen(false);
      setWorkContents(assignment.workContent);
    }
  };

  const handleConfirmClose = (confirmed: boolean) => {
    setOpenConfirmation(false);
    if (confirmed) {
      handleSave();
    } else {
      setOpen(false);
      setWorkContents(assignment.workContent);
    }
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleOpenDialog}>
        <ChecklistRtlIcon color="primary" />
      </IconButton>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Tasks for {tree?.name}</DialogTitle>
        <hr />
        <DialogContent>
          <List>
            {workContents.map((work) => (
              <ListItem key={work.id} className="bg-gray-100 mb-2 rounded-md">
                <Checkbox
                  checked={work.status === 1}
                  onChange={() => handleToggleComplete(work.id)}
                />
                <ListItemText
                  primary={work.content}
                  className={work.status === 1 ? "line-through" : ""}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="success">
            Save
          </Button>
          <Button onClick={handleCloseDialog} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmation}
        onClose={() => handleConfirmClose(false)}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">
          Save your progress
        </DialogTitle>
        <DialogContent>
          <Typography>
            You've changed the status but haven't saved it yet. Save it?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmClose(false)} color="error">
            No
          </Button>
          <Button onClick={() => handleConfirmClose(true)} color="success">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateStatusTask;
