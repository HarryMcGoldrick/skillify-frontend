import {
  Checkbox, FormControlLabel, FormGroup, Grid, IconButton, makeStyles, TextField,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import { fetchObjectives, updateObjectives } from '../../../services/objective-service';

const useStyles = makeStyles(() => ({
  emptyTask: {
    margin: 8,
  },
  task: {
    margin: 8,
    fontSize: '32px !important',
  },
}));

function NodeObjectives(props) {
  const classes = useStyles();
  const { nodeData } = props;
  const [itemList, setItemList] = useState([]);
  const { register, handleSubmit } = useForm();

  // Update the objectives in the server
  const updateItemsInBackend = () => {
    const { id: nodeId } = nodeData;
    if (isAuthenticated() && nodeId) {
      updateObjectives(getUserId(), nodeId, itemList);
    }
  };

  // Update the checkbox and trigger call to update in server
  const toggleCheckBox = (event) => {
    const id = event.target.name;
    const updatedItems = itemList.map((el) => {
      if (el.id.toString() === id) {
        el.checked = !el.checked;
      }
      return el;
    });
    setItemList(updatedItems);

    updateItemsInBackend();
  };

  // Adds a new task and updates in server
  const addItem = (event) => {
    if (event.itemLabel) {
      // Create the item object and add it to the state
      const newItem = { label: event.itemLabel, checked: false, id: itemList.length };
      const newItemList = [...itemList];
      newItemList.push(newItem);
      setItemList(newItemList);

      updateItemsInBackend();
    }
  };

  // Removes a task for a given Id and updates in server
  const removeItem = (id) => {
    // Id is equal to index of itemList
    let filteredItems = [];
    if (id !== 0) {
      filteredItems = itemList.slice(0, id).concat(itemList.slice(id + 1, itemList.length));
    }
    setItemList(filteredItems);
  };

  // Fetch objectives for current node
  useEffect(() => {
    const { id: nodeId } = nodeData;
    if (isAuthenticated()) {
      fetchObjectives(getUserId(), nodeId).then((data) => {
        if (data.items) {
          setItemList(data.items);
        } else {
          setItemList([]);
        }
      });
    }
  }, [nodeData]);

  useEffect(() => {
    updateItemsInBackend();
  }, [itemList]);

  return (
    <FormGroup>
      {
          itemList.map((item) => (
            <div key={item.id}>
              <FormControlLabel
                control={<Checkbox checked={item.checked} onChange={toggleCheckBox} name={item.id.toString()} />}
                label={item.label}
                className={classes.task}
              />
              <IconButton color="primary" onClick={() => removeItem(item.id)} component="span">
                <Delete />
              </IconButton>
            </div>
          ))
      }
      <form>
        <Grid container>
          <Grid item xs={1}>
            <IconButton color="primary" onClick={handleSubmit(addItem)} component="span">
              <Add />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <TextField name="itemLabel" placeholder="New Task" inputRef={register({ required: true })} fullWidth className={classes.emptyTask} size="medium" />
          </Grid>
        </Grid>
      </form>

    </FormGroup>
  );
}

export default NodeObjectives;
