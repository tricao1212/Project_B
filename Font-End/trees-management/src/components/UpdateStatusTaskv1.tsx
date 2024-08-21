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
  Typography,
} from "@mui/material";
import { WorkContentRes } from "../interfaces/Response/WorkContent/WorkContentRes";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import { getTreeById } from "../services/TreeApi";
import { QueryObserverResult } from "@tanstack/react-query";
import { updateAssignment } from "../services/AssignmentApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AssignmentReq } from "../interfaces/Request/Assignment/AssignmentReq";
import { useToast } from "./Toastify";
import { TreeAssignment } from "../interfaces/Response/Tree/TreeAssignment";

interface Props {
  assignment: TreeAssignment;
  treeId: string;
  handleFetch: () => Promise<QueryObserverResult<TreeRes[], Error>>;
}

const UpdateStatusTaskv1 = ({ assignment, treeId, handleFetch }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tree, setTree] = useState<TreeRes>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [workContents, setWorkContents] = useState<WorkContentRes[]>(
    assignment.workContent
  );
  const { showToast } = useToast();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const now = Date.now();
  
  const fetchTree = async () => {
    const res = await getTreeById(treeId);
    setTree(res.data);
  };

  useEffect(() => {
    fetchTree();
  }, [assignment]);

  useEffect(() => {
    setWorkContents(assignment.workContent);
  }, [assignment.workContent]);

  const handleSave = async () => {
    const assignreq: AssignmentReq = {
      treeId: treeId,
      userId: assignment.userId,
      workContent: workContents,
      deadLine: assignment.deadLine,
    };
    const res = await updateAssignment(assignment.id, assignreq, token);
    if (res.isSuccess) {
      showToast("Successful!", "success");
      setOpen(false);
      await handleFetch();
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
      <Button
        style={{ textTransform: "none" }}
        variant="contained"
        onClick={handleOpenDialog}
        disabled = {new Date(assignment.deadLine).getTime() < now}
      >
        <p>Update status</p>
        <ChecklistRtlIcon color="warning" />
      </Button>

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
          <Button onClick={() => handleSave()} color="success">
            Save
          </Button>
          <Button onClick={handleCloseDialog} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
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

export default UpdateStatusTaskv1;
