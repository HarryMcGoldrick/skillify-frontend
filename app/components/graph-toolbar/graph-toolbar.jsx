import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PanToolIcon from '@material-ui/icons/PanTool';
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Button, Grid, makeStyles, Menu, MenuItem,
} from '@material-ui/core';
import { ExpandMore, PlayCircleFilled } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { tools } from '../../enums/tools';
import { layouts } from '../../enums/layouts';
import { sendGraphDataForImage, updateGraphElements } from '../../services/graph-service';
import extractDiagramDataFromGraphData from '../../utils/graph-data';
import { getUserInfo } from '../../services/user-service';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import dagre from 'cytoscape-dagre';
import cytoscape from 'cytoscape';


// Displays icons to select the relevant graph tool

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const GraphToolbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState({});
  const [isUserCreatedMap, setIsUserCreatedMap] = useState(false);
  const {
    cy, viewOnly, addNode, selectNode, removeNode, toggleGraphDetails
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const { id: graphId } = useParams();


  const initLayouts = () => {
    cytoscape.use(dagre)
  }

  const runLayout = () => {
    if (selectedLayout) {
      const layout = cy.layout({ name: selectedLayout });
      layout.run();
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
        addNode(event.position);
      }
    });
  };

  // Removes nodes and edges on click
  const deleteNodeAndEdgeTool = () => {
    cy.on('tap', (event) => {
      if (event.target !== cy) {
        removeNode(event.target.data().id);
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
    updateGraphElements(graphId, extractDiagramDataFromGraphData(cy.json()));
    sendGraphDataForImage(graphId, cy.json());
  };

  const goToEditPage = () => {
    history.push(`/edit/${graphId}`);
    // Need to fully refresh page or graph won't load properly
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const goToViewPage = () => {
    history.push(`/view/${graphId}`);
    // Need to fully refresh page or graph won't load properly
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    if (cy) {
      switchTool(tools.SELECT);
      if (isAuthenticated()) {
        getUserInfo(getUserId()).then((res) => {
          const { graphs_created: graphsCreated } = res;
          if (graphsCreated.includes(graphId)) setIsUserCreatedMap(true);
        });
      }
      initLayouts();
    }
  }, []);

  return (
    <Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<InfoIcon />}
        onClick={() => toggleGraphDetails()}
      >
        Map Info
      </Button>
      {viewOnly && isUserCreatedMap && (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CreateIcon />}
        onClick={() => goToEditPage()}
      >
        Edit Mode
      </Button>
      )}
      {!viewOnly && (
        <>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<VisibilityIcon />}
            onClick={() => goToViewPage()}
          >
            View Mode
          </Button>
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
        </>
      )}
    </Grid>
  );
};

export default GraphToolbar;
