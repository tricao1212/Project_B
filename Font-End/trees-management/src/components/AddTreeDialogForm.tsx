import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToast } from './Toastify';
import { addNew } from '../services/TreeApi';

interface ActionProps {
  handleFecth : () => Promise<void>;
}
export default function AddTreeDialogForm({handleFecth} : ActionProps) {
  const [open, setOpen] = React.useState(false);

  const { showToast } = useToast();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    var res = await addNew(formData);
    if(res.isSuccess){
      await handleFecth();
      showToast('Successul!','success');
    }
    else{
      showToast(`${res.message}`,'error');
    }
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new tree
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            handleSubmit(formData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new tree</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="img"
            name="image"
            label="image"
            type="file"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name tree"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="heigh"
            name="heigh"
            label="Heigh"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="position"
            name="position"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}