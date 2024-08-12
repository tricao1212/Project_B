import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useToast } from "./Toastify";
import { UserRes } from "../interfaces/Response/User/UserRes";
import { updateUser } from "../services/UserApi";
import { Role } from "../interfaces/Enum/Role";
import { QueryObserverResult } from "@tanstack/react-query";

interface ActionProps {
  user: UserRes;
  handleFetch: () => Promise<QueryObserverResult<UserRes[], Error>>;
}

export default function EditUserDialogForm({ user, handleFetch }: ActionProps) {
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(user.avatar);
  const [role, setRole] = React.useState<Role>(user.role);
  const [phoneError, setPhoneError] = React.useState<string>("");

  const validatePhone = (phone: string) => {
    const phoneRegex = /^0\d{9,10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setRole(Number(event.target.value) as Role);
  };

  const roleOptions = Object.keys(Role)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: Role[key as keyof typeof Role],
      label: key,
    }));

  const formatDateToInputValue = (date: Date | null) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    var res = await updateUser(user.id, formData, token);
    if (res.isSuccess) {
      await handleFetch();
      showToast("Successful!", "success");
      handleClose();
    } else {
      showToast(`${res.message}`, "error");
    }
  };

  React.useEffect(() => {
    setRole(user.role);
    setPreview(user.avatar);
  }, [user]);

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={() => handleClickOpen()}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const imageFile = formData.get("image") as File;
            if (!imageFile || imageFile.size === 0) {
              formData.set("image", "");
            } else {
              formData.set("image", imageFile);
            }

            const phone = formData.get("phone") as string;

            if (!validatePhone(phone)) {
              if (phone) {
                setPhoneError("Please enter a valid phone number");
                return;
              }
            }

            setPhoneError("");
            handleSubmit(formData);
          },
        }}
      >
        <DialogTitle>Update user</DialogTitle>
        <DialogContent>
          <div className="flex justify-between">
            <div className="mr-5">
              <p>Current Avatar:</p>
              {file === null ? (
                <img
                  src={`http://localhost:2024/images/${preview}`}
                  alt=""
                  className="w-36 h-20"
                />
              ) : preview ? (
                <img src={preview} alt="" className="w-36 h-20" />
              ) : (
                <img src="" alt="" className="w-36 h-20" />
              )}
            </div>
            <TextField
              margin="dense"
              id="img"
              name="image"
              label="Select new avatar"
              type="file"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true, // Ensures the label does not overlap the field
              }}
              onChange={handleFileChange}
            />
          </div>
          <TextField
            required
            margin="dense"
            id="fullName"
            name="fullName"
            label="Full name"
            defaultValue={user.fullName}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone"
            defaultValue={user.phone}
            name="phone"
            label="Phone number"
            type="tel"
            error={!!phoneError}
            helperText={phoneError}
            onChange={(e) => {
              if (validatePhone(e.target.value)) {
                setPhoneError("");
              }
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="dob"
            name="dob"
            label="Date of birth"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={formatDateToInputValue(user.dob)}
            InputLabelProps={{
              shrink: true, // Ensures the label does not overlap the field
            }}
          />
          <FormControl fullWidth required style={{ marginTop: "10px" }}>
            <InputLabel id="role-label" style={{ color: "black" }}>
              Role
            </InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              defaultValue={role}
              onChange={handleChange}
              label="Role"
              required
            >
              {roleOptions.map((roleOption) => (
                <MenuItem key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
