import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({task, button, handleClose, open, submitAction}) {
  const [newDescription, setNewDescription] = React.useState(task.description);

  return (
    <div>
      {button}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="edit-task-form">Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update your description for this task below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => submitAction(e, newDescription, task._id)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}