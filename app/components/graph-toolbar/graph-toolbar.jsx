import React, { useEffect, useState } from 'react';
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
import { updateGraphElements } from '../../services/graph-service';
import extractDiagramDataFromGraphData from '../../utils/graph-data';

// Displays icons to select the relevant graph tool

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const GraphToolbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState({});
  const { cy, selectNode } = props;
  const classes = useStyles();

  const runLayout = () => {
    if (selectedLayout) {
      cy.layout({ name: selectedLayout }).run();
      cy.fit();
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (layout) => {
    setAnchorEl(null);
    setSelectedLayout(layout);
  };

  // Remove the event listeners added by the tools - enables switching of tools
  const removeListeners = () => {
    cy.removeListener('tap');
    cy.removeListener('click');
  };

  // Sets the currentNode state object when a node is clicked
  const selectNodeTool = () => {
    cy.on('click', 'node', (event) => {
      // Prevent edgehandle from being selected
      if (event.target.classes()[0] === 'eh-handle') {
        return;
      }

      const currentNode = event.target;
      selectNode(currentNode.data());
    });
  };

  // Adds a node onto the graph
  const addNodeTool = () => {
    cy.on('tap', (event) => {
      if (event.target === cy) {
        const { x, y } = event.position;
        cy.add({
          group: 'nodes',
          position: { x, y },
        });
        // Select the newest node added
        const node = cy.nodes().pop();
        selectNode(node.data());
      }
    });
  };

  // Removes nodes and edges on click
  const deleteNodeAndEdgeTool = () => {
    cy.on('tap', (event) => {
      if (event.target !== cy) {
        cy.remove(event.target);
      }
    });
  };

  // Used to remove listeners and switch tools
  const switchTool = (tool) => {
    // Remove previous tools
    removeListeners();

    switch (tool) {
      case tools.SELECT:
        selectNodeTool();
        break;
      case tools.ADD:
        addNodeTool();
        break;
      case tools.DELETE:
        deleteNodeAndEdgeTool();
        break;
      default:
        break;
    }
  };

  // Saves the changes made to a graph
  const updateData = () => {
    const { graphId } = props;
    updateGraphElements(graphId, extractDiagramDataFromGraphData(cy.json()));
  };

  useEffect(() => {
    switchTool(tools.SELECT);
  });

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
  cy: PropTypes.object.isRequired,
  selectNode: PropTypes.func.isRequired,
  graphId: PropTypes.string.isRequired,
};

export default GraphToolbar;
