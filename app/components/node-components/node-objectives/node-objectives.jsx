import {
  Checkbox, FormControlLabel, FormGroup, IconButton, TextField,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import { fetchObjectives, updateObjectives } from '../../../services/objective-service';

function NodeObjectives(props) {
  const { nodeData } = props;
  const [itemList, setItemList] = useState([]);
  const { register, handleSubmit } = useForm();
  const { id: graphId } = useParams();

  const updateItemsInBackend = () => {
    const { id: nodeId } = nodeData;
    if (isAuthenticated() && nodeId) {
      updateObjectives(getUserId(), nodeId, itemList);
    }
  };

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

  const removeItem = (id) => {
    // Id is equal to index of itemList
    let filteredItems = [];
    if (id !== 0) {
      filteredItems = itemList.slice(0, id).concat(itemList.slice(id + 1, itemList.length));
    }
    setItemList(filteredItems);
  };

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
              />
              <IconButton color="primary" onClick={() => removeItem(item.id)} component="span">
                <Delete />
              </IconButton>
            </div>
          ))
      }
      <form>
        <IconButton color="primary" onClick={handleSubmit(addItem)} component="span">
          <Add />
        </IconButton>
        <TextField name="itemLabel" placeholder="New Task" inputRef={register({ required: true })} />
      </form>
    </FormGroup>
  );
}

export default NodeObjectives;
