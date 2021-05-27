import { Drawer, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Prompt, useParams } from 'react-router';
import { GraphDetails, NodeDrawerPanel } from '../../components';
import { getUserInfoByUsername } from '../../services/user-service';
import { getExistingSession, getUserId, isAuthenticated } from '../../utils/authentication';
import GraphContainer from '../graph-container/graph-container';
import './graph-page.css';

/*
  Groups the graph page components together and sets their viewOnly props
*/
const GraphPage = (props) => {
  const {
    selectedNode, showGraphDetails, viewOnly,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const { id: graphId } = useParams();

  useEffect(() => {
    if (!viewOnly) {
      const { username } = isAuthenticated() ? getExistingSession() : '';
      if (username) {
        getUserInfoByUsername(username).then((data) => {
          if (data) {
            if (data.graphs_created.includes(graphId)) setIsVisible(true);
          }
          // Triggers the prompt before unloading the page
          window.onbeforeunload = () => true;
        });
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  return (
    <div>
      {isVisible && (
        <>
          <Grid container justify="center">
            <Grid item>
              <Drawer anchor="left" open={showGraphDetails} variant="persistent">
                <GraphDetails viewOnly={viewOnly} />
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
            <Grid item className={showGraphDetails ? 'drawer-open' : 'drawer-close'} style={showGraphDetails ? { marginLeft: '800px' } : {}}>
              <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '500px' } : {}}>
                <GraphContainer viewOnly={viewOnly} />
              </Grid>
            </Grid>
          </Grid>

          <Prompt
            when={!viewOnly}
            message="Any unsaved changes will be lost!"
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.present.elements,
  selectedNode: state.graph.present.selectedNode,
  showGraphDetails: state.graph.present.showGraphDetails,
  username: state.user.username,
});

export default connect(mapStateToProps)(GraphPage);
