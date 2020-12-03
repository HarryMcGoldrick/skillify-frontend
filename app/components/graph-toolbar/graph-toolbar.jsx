import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PanToolIcon from '@material-ui/icons/PanTool';
import SaveIcon from '@material-ui/icons/Save';
import { tools } from '../../enums/tools';

const GraphToolbar = (props) => {
  const { switchTool, updateData } = props;
  return (
    <div>
      <IconButton aria-label="save" onClick={() => updateData()}>
        <SaveIcon />
      </IconButton>
      <IconButton aria-label="select" onClick={() => switchTool(tools.SELECT)}>
        <PanToolIcon />
      </IconButton>
      <IconButton aria-label="add" onClick={() => switchTool(tools.ADD)}>
        <AddCircleIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => switchTool(tools.DELETE)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

GraphToolbar.propTypes = {
  switchTool: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default GraphToolbar;
