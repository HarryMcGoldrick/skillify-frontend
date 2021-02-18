import { Checkbox, FormControlLabel, FormGroup, IconButton, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import { fetchNodeObjectives, updateNodeObjectives } from '../../services/user-service';

function NodeObjectives(props) {
    const { nodeData } = props;
    const [itemList, setItemList] = useState([]);
    const { register, handleSubmit } = useForm();
    const {id: graphId} = useParams();

    const toggleCheckBox = (event) => {
        const id = event.target.name;
        const updatedItems = itemList.map(el => {
            if (el.id.toString() === id) {
                el.checked = !el.checked;
            }
            return el
        });
        setItemList(updatedItems);

        updateItemsInBackend();
    };

    const addItem = (event) => {
        if (event.itemLabel) {
            // Create the item object and add it to the state
            const newItem = {label: event.itemLabel, checked: false, id: itemList.length}
            const newItemList = [...itemList]
            newItemList.push(newItem);
            setItemList(newItemList);

            updateItemsInBackend(newItemList);
        }
    }

    const removeItem = (id) => {
        // Id is equal to index of itemList
        if (id === 0) {
            setItemList([]);
        } else if (id) {
            const filteredItems = itemList.slice(0, id).concat(itemList.slice(id + 1, itemList.length))
            setItemList(filteredItems);
        }

        updateItemsInBackend(filteredItems);
    }

    const updateItemsInBackend = (itemsToUpdate) => {
        const {id: nodeId} = nodeData;
        if (isAuthenticated() && nodeId) {
            const nodeObjectives = {
                nodeId,
                items: itemsToUpdate,
            }
            updateNodeObjectives(graphId, getUserId(), nodeObjectives)
        }
    }

    useEffect(() => {
        const {id: nodeId} = nodeData;
        fetchNodeObjectives(graphId, getUserId(), nodeId).then(data => {
            if (data.objectives.length > 0) {
                const list = data.objectives[0];
                if (list.items) {
                    setItemList(list.items);
                }
            } else {
                setItemList([]);
            }
        });
    }, [nodeData])

    return (
    <FormGroup>
      {
          itemList.map((item) => {
              return(
                  <div key={item.id}>
                    <FormControlLabel
                    control={<Checkbox checked={item.checked} onChange={toggleCheckBox} name={item.id.toString()} />}
                    label={item.label}
                    
                    />
                    <IconButton color="primary" onClick={() => removeItem(item.id)} component="span">
                        <Delete/>
                    </IconButton>
                 </div>
              )
          })
      }
        <form>
            <IconButton color="primary" onClick={handleSubmit(addItem)} component="span">
                <Add />
            </IconButton>
            <TextField name="itemLabel" placeholder="New Task" inputRef={register({ required: true })} />
        </form>
    </FormGroup>
    )
}

export default NodeObjectives
