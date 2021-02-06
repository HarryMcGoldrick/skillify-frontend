import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import edgehandles from 'cytoscape-edgehandles';
import edgeHandleStyle from './edgehandle-style';
import { GraphToolbar } from '../../components';
import {
  addNode, removeNode, selectNode, toggleGraphDetails, updateElements,
} from '../../redux/graph/graphActions';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import { FETCH_COMPLETED_NODES_REQUEST, FETCH_GRAPH_REQUEST, UPDATE_GRAPH_REQUEST } from '../../redux/graph/graphTypes';

function GraphContainer(props) {
  const { elements, viewOnly } = props;
  let cyRef = useRef(null);
  const { id: graphId } = useParams();
  const [cy, setCy] = useState(null);

  const initEditMode = () => {
    if (!cy.edgehandles) {
      cytoscape.use(edgehandles);
      cy.style(edgeHandleStyle);
      const edgehandler = cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  };

  const initViewMode = () => {
    cy.autolock(true);
  };


  useEffect(() => {
    props.fetchGraphData(graphId);

    // If user is logged in check if this graph exists in the users progress info
    if (isAuthenticated() && !viewOnly) {
      const userId = getUserId();
      props.fetchCompletedNodes(userId, graphId);
      
    }

    setCy(cyRef);
  }, [cyRef]);

  useEffect(() => {
    if (cy) {
      // Enable configuration based on view mode 
      viewOnly ? initViewMode() : initEditMode();
    }
  }, [cy]);

  return (
    <div>
      {cy && (<GraphToolbar {...props} cy={cy} />)}
      <CytoscapeComponent
        className="graph"
        elements={elements}
        cy={(cyto) => {
          cyRef = cyto;
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  elements: state.graph.elements,
  selectedNode: state.graph.selectedNode,
  viewOnly: state.graph.viewOnly,
});

const mapDispatchToProps = (dispatch) => ({
  addNode: (pos) => dispatch(addNode(pos)),
  removeNode: (id) => dispatch(removeNode(id)),
  updateElements: (elements) => dispatch(updateElements(elements)),
  selectNode: (node) => dispatch(selectNode(node)),
  fetchGraphData: (graphId) => dispatch({type: FETCH_GRAPH_REQUEST, payload: {graphId}}),
  fetchCompletedNodes: (userId, graphId) => dispatch({type: FETCH_COMPLETED_NODES_REQUEST, payload: {userId, graphId}}),
  toggleGraphDetails: () => dispatch(toggleGraphDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
