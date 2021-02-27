import React from 'react'
import { connect } from 'react-redux';
import { addStyle } from '../../../redux/graph/graphActions';

function NodeAppearance(props) {
    
    const updateShape = () => {
        const styleElement = {
            selector: `node[id="${props.selectedNode.id}"]`,
            style: {
              'background-color': 'blue'
            },
          }
        props.addStyle(styleElement)
    }

    return (
        <div>
            <button onClick={updateShape}>Update Color</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedNode: state.graph.selectedNode,
});
  
const mapDispatchToProps = (dispatch) => ({
    addStyle: (styleElement) => dispatch(addStyle(styleElement)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeAppearance)
