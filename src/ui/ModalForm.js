import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalForm({task, button, handleClose, open, create, submitAction}) {
  
  const [newDescription, setNewDescription] = useState("");
  
  useEffect(() => {
    if (task) {
    setNewDescription(task.description)
    }
  }, [task])
  
  const handleChange = (e) => {
    setNewDescription(e.target.value)
  }

  return (
    <div>
      {button}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {!create ? (<DialogTitle id="edit-task-form">Edit Task</DialogTitle>) 
        : (<DialogTitle id="edit-task-form">Create A Task</DialogTitle>)
        }
        <DialogContent>
          {!create ? 
            (<DialogContentText>
              Update your description for this task below
            </DialogContentText>)
          :
            (<DialogContentText>
              Provide a description for your new task
            </DialogContentText>)
          }
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            value={newDescription}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
         {!create ? 
          (<Button onClick={(e) => submitAction(e, newDescription, task._id)} color="primary">
            Update
          </Button>)
          :
           (
           <Button onClick={(e) => submitAction(e, newDescription)} color="primary">
            Create
          </Button>)
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}