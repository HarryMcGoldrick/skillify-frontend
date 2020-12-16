import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PanToolIcon from '@material-ui/icons/PanTool';
import SaveIcon from '@material-ui/icons/Save';
import {
  Button, makeStyles, Menu, MenuItem,
} from '@material-ui/core';
import { ExpandMore, PlayCircleFilled } from '@material-ui/icons';
import { tools } from '../../enums/tools';
import { layouts } from '../../enums/layouts';

// Displays icons to select the relevant graph tool

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const GraphToolbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    switchTool, updateData, switchLayout, runLayout,
  } = props;
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (layout) => {
    setAnchorEl(null);
    switchLayout(layout);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => updateData()}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<PanToolIcon />}
        onClick={() => switchTool(tools.SELECT)}
      >
        Select
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={() => switchTool(tools.ADD)}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => switchTool(tools.DELETE)}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={runLayout}
        startIcon={<PlayCircleFilled />}
      >
        Run Layout
      </Button>
      <Button variant="contained" color="primary" aria-haspopup="true" onClick={handleClick} startIcon={<ExpandMore />}>
        Layouts
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        color="primary"
      >
        <MenuItem onClick={() => handleClose(layouts.DAGRE)}>Dagre</MenuItem>
        <MenuItem onClick={() => handleClose('')}>None</MenuItem>

      </Menu>
    </div>
  );
};

GraphToolbar.propTypes = {
  switchTool: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  switchLayout: PropTypes.func.isRequired,
  runLayout: PropTypes.func.isRequired,
};

export default GraphToolbar;
