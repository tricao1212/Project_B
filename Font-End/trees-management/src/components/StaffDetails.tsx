import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { UserRes } from "../interfaces/Response/User/UserRes";
import { formatDateOnly } from "../utils/formatDate";
import { getAllTree } from "../services/TreeApi";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import { getWorkStatus } from "../utils/getWorkStatus";

interface Props {
  user: UserRes;
}

type IdToNameMap = Map<string, string>;

const StaffDetails: React.FC<Props> = ({ user }) => {
  const [treenames, setTreenames] = useState<Map<string, string>>(new Map());
  const fetchTrees = async () => {
    const res = await getAllTree();
    const treeMap: IdToNameMap = new Map(
      res.data.map((tree: TreeRes) => [
        tree.id,
        tree.name + " " + "(" + tree.treeCode + ")",
      ])
    );
    setTreenames(treeMap);
  };
  const now = Date.now();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  return (
    <>
      <IconButton color="success" onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="bg-green-300">
          {user.fullName}'s Information
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
            <Card className="lg:w-1/3 h-1/2 mt-8">
              <CardContent className="flex flex-col items-center">
                <Avatar
                  alt={user.fullName}
                  src={`http://localhost:2024/images/${user.avatar}`}
                  className="w-24 h-24 mb-4"
                />
                <Typography variant="h5">{user.fullName}</Typography>
                <Typography color="textSecondary">@{user.userName}</Typography>
                <Typography color="textSecondary">{user.phone}</Typography>
                <Typography color="textSecondary">
                  {user.dob ? formatDateOnly(user.dob) : "-"}
                </Typography>
              </CardContent>
            </Card>

            <div className="lg:w-2/3">
              <Typography variant="h6" className="mb-4">
                Assignments
              </Typography>
              <div className="space-y-4">
                {user.assignments.map((assignment) => (
                  <Card key={assignment.id} className="shadow">
                    <CardContent>
                      <Typography variant="h6" color="textPrimary">
                        Tree name: {treenames.get(assignment.treeId)}
                      </Typography>
                      <Typography color="textSecondary">
                        Created By: {assignment.createdBy}
                      </Typography>
                      <Typography color="textSecondary">
                        <p>
                          {" "}
                          Due:
                          {new Date(assignment.deadLine).getTime() < now ? (
                            <span className="text-red-500">
                              {formatDateOnly(assignment.deadLine)} (overdue)
                            </span>
                          ) : (
                            <span className="text-green-500">{formatDateOnly(assignment.deadLine)}</span>
                          )}
                        </p>
                      </Typography>
                      <div className="mt-2 space-y-2">
                        {assignment.workContent.map((work, index) => (
                          <div key={work.id} className="flex justify-between">
                            <Typography>
                              {index + 1}.{work.content}
                            </Typography>
                            <Typography
                              className={`${
                                work.status === 0
                                  ? "text-blue-400"
                                  : "text-green-500"
                              }`}
                            >
                              {getWorkStatus(work.status)}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffDetails;
