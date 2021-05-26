import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import PanToolIcon from '@material-ui/icons/PanTool';
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Button, Grid, IconButton, makeStyles, Menu, MenuItem,
} from '@material-ui/core';
import {
  ExpandMore, PlayCircleFilled, Redo, Undo,
} from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import dagre from 'cytoscape-dagre';
import cytoscape from 'cytoscape';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import klay from 'cytoscape-klay';
import { tools } from '../../../enums/tools';
import { layouts } from '../../../enums/layouts';
import { sendGraphDataForImage, updateGraphElements, updateGraphStyle } from '../../../services/graph-service';
import extractDiagramDataFromGraphData from '../../../utils/graph-data';
import { getUserInfo } from '../../../services/user-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import {
  addNode, removeNode, selectNode, toggleGraphDetails, updateElements,
} from '../../../redux/graph/graphActions';
import { nodeType } from '../../../enums/nodeTypes';
import { checkValidAddTarget, checkValidDeleteTarget, getStartNode } from '../../../utils/node-utils';

// Displays icons to select the relevant graph tool

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

/*
  Controls the graph interaction tools for the cytoscape graph.
*/
const GraphToolbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState({});
  const [isUserCreatedMap, setIsUserCreatedMap] = useState(false);
  const {
    cy, viewOnly, addNode, selectNode, removeNode, toggleGraphDetails, updateElements,
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const { id: graphId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const initLayouts = () => {
    cytoscape.use(dagre);
    cytoscape.use(klay);
  };

  const runLayout = () => {
    if (selectedLayout) {
      const layout = cy.elements().not('.eh-handle', 'eh-source', 'eh-ghost-node').layout({ name: selectedLayout, ROOT: getStartNode(cy) });
      // Ensure element state is set before layout so it can be undone

      updateElements(cy.elements().not('.eh-handle', 'eh-source', 'eh-ghost-node').jsons(true));
      layout.run();
      layout.one('layoutstop', () => {
        updateElements(cy.json(true).elements);
      });
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
  const addNodeTool = (nodeType) => {
    cy.on('tap', (event) => {
      if (event.target === cy) {
        const validAdd = checkValidAddTarget(cy, nodeType);
        if (validAdd === true) {
          addNode(event.position, nodeType);
        } else {
          enqueueSnackbar(validAdd.error);
        }
      }
    });
  };

  // Removes nodes and edges on click
  const deleteNodeAndEdgeTool = () => {
    cy.on('tap', (event) => {
      if (event.target !== cy) {
        const validDelete = checkValidDeleteTarget(cy, event.target.data());
        if (validDelete === true) {
          removeNode(event.target.data().id);
        } else {
          enqueueSnackbar(validDelete.error);
        }
      }
    });
  };

  // Used to remove listeners and switch tools
  const switchTool = (tool, nodeType) => {
    // Remove previous tools
    removeListeners();

    switch (tool) {
      case tools.SELECT:
        selectNodeTool();
        break;
      case tools.ADD:
        addNodeTool(nodeType);
        break;
      case tools.DELETE:
        deleteNodeAndEdgeTool();
        break;
      default:
        break;
    }
  };

  // Update the add dropdown menu onClick
  const addHandleClick = (event) => {
    setAddAnchorEl(event.currentTarget);
  };

  // Close the add dropdown menu
  const addHandleClose = (nodeType) => {
    setAddAnchorEl(null);
    switchTool(tools.ADD, nodeType);
  };

  // Saves the changes made to a graph
  const updateData = () => {
    updateGraphElements(graphId, extractDiagramDataFromGraphData(cy.json()));
    updateGraphStyle(graphId, cy.json().style);
    sendGraphDataForImage(graphId, cy.json());
  };

  // Navigate to the edit page
  const goToEditPage = () => {
    history.push(`/edit/${graphId}`);
    location.reload();
  };

  // Navigate to the view page
  const goToViewPage = () => {
    history.push(`/view/${graphId}`);
    location.reload();
  };

  useEffect(() => {
    // After cytoscape has been initialised -> set default tool to select and determine if graph is made by current user
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
          <Button variant="contained" color="primary" aria-haspopup="true" onClick={addHandleClick} startIcon={<ExpandMore />}>
            Nodes
          </Button>
          <Menu
            anchorEl={addAnchorEl}
            keepMounted
            open={Boolean(addAnchorEl)}
            onClose={addHandleClose}
            color="primary"
          >
            <MenuItem onClick={() => addHandleClose(nodeType.STANDARD)}>Standard Node</MenuItem>
            <MenuItem onClick={() => addHandleClose(nodeType.ROOT)}>Start Node</MenuItem>

          </Menu>
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
            <MenuItem onClick={() => handleClose(layouts.GRID)}>Grid</MenuItem>
            <MenuItem onClick={() => handleClose(layouts.CIRCLE)}>Circle</MenuItem>
            <MenuItem onClick={() => handleClose(layouts.CONCENTRIC)}>Concentric</MenuItem>
            <MenuItem onClick={() => handleClose(layouts.BREADTH_FIRST)}>BreadthFirst</MenuItem>
            <MenuItem onClick={() => handleClose(layouts.COSE)}>Cose</MenuItem>
            <MenuItem onClick={() => handleClose(layouts.KLAY)}>Klay</MenuItem>
            <MenuItem onClick={() => handleClose('')}>None</MenuItem>

          </Menu>
          <IconButton onClick={props.onUndo}>
            <Undo />
          </IconButton>
          <IconButton onClick={props.onRedo}>
            <Redo />
          </IconButton>
        </>
      )}
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addNode: (pos, type) => dispatch(addNode(pos, type)),
  removeNode: (id) => dispatch(removeNode(id)),
  toggleGraphDetails: () => dispatch(toggleGraphDetails()),
  selectNode: (node) => dispatch(selectNode(node)),
  updateElements: (elements) => dispatch(updateElements(elements)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

export default connect(null, mapDispatchToProps)(GraphToolbar);
