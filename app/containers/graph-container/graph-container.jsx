import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GraphToolbar } from '../../components';
import {
  addNode, removeNode, selectNode, updateElements,
} from '../../redux/graph/graphActions';
import { fetchGraphData } from '../../redux/graph/graphAsyncActions';

function GraphContainer(props) {
  const { elements, fetchGraphData } = props;
  let cyRef = useRef(null);
  const { id: graphId } = useParams();
  const [cy, setCy] = useState(null);

  useEffect(() => {
    fetchGraphData(graphId);
    setCy(cyRef);
  }, [cyRef]);

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
});

const mapDispatchToProps = (dispatch) => ({
  addNode: (pos) => dispatch(addNode(pos)),
  removeNode: (id) => dispatch(removeNode(id)),
  updateElements: (elements) => dispatch(updateElements(elements)),
  selectNode: (node) => dispatch(selectNode(node)),
  fetchGraphData: (id) => dispatch(fetchGraphData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
