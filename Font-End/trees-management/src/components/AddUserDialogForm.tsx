import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "./Toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { register } from "../services/UserApi";
import { Role } from "../interfaces/Enum/Role";
import { QueryObserverResult } from "@tanstack/react-query";
import { UserRes } from "../interfaces/Response/User/UserRes";

interface ActionProps {
  handleFecth: () => Promise<QueryObserverResult<UserRes[], Error>>;
}
export default function AddUserDialogForm({ handleFecth }: ActionProps) {
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const [role, setRole] = React.useState<Role>(Role.Admin);
  const [phoneError, setPhoneError] = React.useState<string>("");

  const validatePhone = (phone: string) => {
    if (phone === "") {
      return true;
    }

    const phoneRegex = /^0\+?[1-9]\d{9,11}$/;

    return phoneRegex.test(phone);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setRole(Number(event.target.value) as Role);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const roleOptions = Object.keys(Role)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: Role[key as keyof typeof Role],
      label: key,
    }));

  const handleSubmit = async (formData: FormData) => {
    var res = await register(formData, token);
    if (res.isSuccess) {
      await handleFecth();
      showToast("Successul!", "success");
    } else {
      showToast(`${res.message}`, "error");
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Register new user
      </Button>
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
              formData.set("image", ""); // Set an empty string instead of the file
            }

            const phone = formData.get("phone") as string;
            if (!validatePhone(phone)) {
              setPhoneError("Please enter a valid phone number");
              return;
            }
            setPhoneError("");

            handleSubmit(formData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Register new user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="image"
            name="image"
            label="Avatar"
            type="file"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true, // Ensures the label does not overlap the field
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="userName"
            name="userName"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="password"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="fullName"
            name="fullName"
            label="Full name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
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
            autoFocus
            margin="dense"
            id="dob"
            name="dob"
            label="Date of birth"
            type="date"
            fullWidth
            variant="standard"
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
              value={role}
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
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
