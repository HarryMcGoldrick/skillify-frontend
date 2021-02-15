import { Drawer, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { GraphDetails } from '../../components';
import NodeDrawerPanel from '../../components/node-drawer-panel/node-drawer-panel';
import GraphContainer from '../graph-container/graph-container';
import './graph-page.css'

const GraphPage = (props) => {
  const {
    selectedNode, showGraphDetails, viewOnly
  } = props;

  return (
    <Grid container justify="center">
      <Grid item>
        <Drawer anchor="left" open={showGraphDetails} variant="persistent">
          <GraphDetails viewOnly={viewOnly}/>
        </Drawer>
      </Grid>

      <Grid item>
        <Drawer
          anchor="right"
          open={Boolean(selectedNode.id)}
          variant="persistent"
        >
          <NodeDrawerPanel viewOnly={viewOnly} />
        </Drawer>
      </Grid>

      {/* Inline style has to be used here unfortunately */}
      <Grid item className={showGraphDetails ? 'drawer-open' : 'drawer-close'} style={showGraphDetails ? { marginLeft: '740px' } : {}}>
        <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '481px' } : {}}>
          <GraphContainer viewOnly={viewOnly} />
        </Grid>
      </Grid>
    </Grid>

  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.elements,
  selectedNode: state.graph.selectedNode,
  showGraphDetails: state.graph.showGraphDetails,
});

export default connect(mapStateToProps)(GraphPage);
