import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import edgehandles from 'cytoscape-edgehandles';
import edgeHandleStyle from './edgehandle-style';
import { GraphToolbar } from '../../components';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import { FETCH_COMPLETED_NODES_REQUEST, FETCH_GRAPH_REQUEST, UPDATE_GRAPH_REQUEST } from '../../redux/graph/graphTypes';
import { updateProgressMode } from '../../redux/graph/graphActions';
import viewOnlyStyle from './viewOnly-style';
import { getNodeWithId } from '../../utils/graph-utils';

function GraphContainer(props) {
  const { elements, viewOnly, selectedNode, updateProgressMode } = props;
  let cyRef = useRef(null);
  const { id: graphId } = useParams();
  const [cy, setCy] = useState(null);

  const initEditMode = () => {
    updateProgressMode(false);
    if (!cy.edgehandles) {
      cytoscape.use(edgehandles);
      cy.style(edgeHandleStyle);
      const edgehandler = cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  };

  const initViewMode = () => {
    cy.autolock(true);
    cy.style(viewOnlyStyle);
  };


  useEffect(() => {
    props.fetchGraphData(graphId);

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
      viewOnly ? initViewMode() : initEditMode();
    }
  }, [cy]);

  useEffect(() => {
    if (cy && selectedNode.id) {
      const node = getNodeWithId(cy, selectedNode.id)
      // Unselect all prior nodes to prevent multiple selected nodes
      cy.nodes().unselect()
      // Select current node to highlight it
      node.select()
      // Animate a smooth transition to center on that node
      cy.animate({
        center: {eles: node},
        zoom: 2
      })

 
    }
  }, [cy, selectedNode]);

  return (
    <div>
      {cy && (<GraphToolbar cy={cy} viewOnly={viewOnly} />)}
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
  progressMode: state.graph.progressMode,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGraphData: (graphId) => dispatch({type: FETCH_GRAPH_REQUEST, payload: {graphId}}),
  fetchCompletedNodes: (userId, graphId) => dispatch({type: FETCH_COMPLETED_NODES_REQUEST, payload: {userId, graphId}}),
  updateProgressMode: () => dispatch(updateProgressMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
