import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import edgehandles from 'cytoscape-edgehandles';
import { useSnackbar } from 'notistack';
import editStyle from './edit-style';
import { GraphToolbar } from '../../components';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import { FETCH_COMPLETED_NODES_REQUEST, FETCH_GRAPH_REQUEST, FETCH_STYLE_SHEET_REQUEST } from '../../redux/graph/graphTypes';
import {
  updateProgressMode, updateStyleSheet, updateSelectedNodePath, selectNode, updateNode, updateConnectedNodes,
} from '../../redux/graph/graphActions';
import viewOnlyStyle from './viewOnly-style';
import { getConnectedNodes, getNodeWithId, updateProgressModeNodeClasses } from '../../utils/graph-utils';
import { getNodesFromElementCollection, getStartNode } from '../../utils/node-utils';

function GraphContainer(props) {
  const {
    elements, viewOnly, selectedNode, updateProgressMode,
    updateSelectedNodePath, completedNodes, progressMode, selectNode,
    updateNode,
  } = props;
  let cyRef = useRef(null);
  const { id: graphId } = useParams();
  const [cy, setCy] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const initEditMode = () => {
    updateProgressMode(false);
    if (!cy.edgehandles) {
      cytoscape.use(edgehandles);
      props.updateStyleSheet(editStyle);
      const edgehandler = cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  };

  const initViewMode = () => {
    cy.autolock(true);
    props.updateStyleSheet(viewOnlyStyle);
  };

  useEffect(() => {
    props.fetchGraphData(graphId);
    props.fetchStyleSheet(graphId);

    // If user is logged in check if this graph exists in the users progress info
    if (isAuthenticated() && viewOnly) {
      const userId = getUserId();
      props.fetchCompletedNodes(userId, graphId);
    }

    setCy(cyRef);
  }, [cyRef]);

  useEffect(() => {
    if (cy) {
      // Enable configuration based on view mode
      if (progressMode) {
        initViewMode();
      } else if (!viewOnly) {
        initEditMode();
      } else {
        initViewMode();
      }
    }
  }, [cy]);

  useEffect(() => {
    // This useEffect hooks acts as an event handler for selectNode
    // Handles cytoscape events when node is selected
    if (cy && selectedNode.id) {
      const node = getNodeWithId(cy, selectedNode.id);
      // Unselect all prior nodes to prevent multiple selected nodes
      cy.nodes().unselect();
      // Select current node to highlight it
      node.select();
      // Animate a smooth transition to center on that node
      cy.animate({
        center: { eles: node },
        zoom: progressMode ? 3 : 2,
      });

      // Get the predecessors of the selected node and arrange them in top-bottom order
      const nodePred = node.predecessors('node');
      nodePred.unshift(node);
      nodePred.reverse();
      updateSelectedNodePath(getNodesFromElementCollection(nodePred));

      // Get connected Nodes
      const connectedNodes = getConnectedNodes(cy, selectedNode);
      props.updateConnectedNodes(connectedNodes);
    }
  }, [cy, selectedNode]);

  useEffect(() => {
    if (cy && props.progressMode) {
      if (completedNodes.length === 0) {
        // Select starting node.
        enqueueSnackbar('Progress mode initiated');
        selectNode(getStartNode(cy).data());
      }
      updateProgressModeNodeClasses(cy, completedNodes, updateNode);
    }
  }, [cy, completedNodes, progressMode]);

  return (
    <div>
      {cy && (<GraphToolbar cy={cy} viewOnly={viewOnly} />)}
      <CytoscapeComponent
        className="graph"
        elements={elements}
        cy={(cyto) => {
          cyRef = cyto;
        }}
        stylesheet={props.styleSheet}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  elements: state.graph.present.elements,
  selectedNode: state.graph.present.selectedNode,
  progressMode: state.graph.present.progressMode,
  styleSheet: state.graph.present.styleSheet,
  completedNodes: state.graph.present.completedNodes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGraphData: (graphId) => dispatch({ type: FETCH_GRAPH_REQUEST, payload: { graphId } }),
  fetchStyleSheet: (graphId) => dispatch({ type: FETCH_STYLE_SHEET_REQUEST, payload: { graphId } }),
  fetchCompletedNodes: (userId, graphId) => dispatch({ type: FETCH_COMPLETED_NODES_REQUEST, payload: { userId, graphId } }),
  updateProgressMode: (mode) => dispatch(updateProgressMode(mode)),
  updateStyleSheet: (styleSheet) => dispatch(updateStyleSheet(styleSheet)),
  updateSelectedNodePath: (nodes) => dispatch(updateSelectedNodePath(nodes)),
  selectNode: (node) => dispatch(selectNode(node)),
  updateNode: (node) => dispatch(updateNode(node)),
  updateConnectedNodes: (nodes) => dispatch(updateConnectedNodes(nodes)),

});

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
