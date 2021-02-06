import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { Drawer, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import dagre from 'cytoscape-dagre';
import { loadGraphElements, addGraphToGraphProgress } from '../../services/graph-service';
import edgeHandleStyle from '../../containers/graph-container/edgehandle-style';
import GraphDetails from '../graph-details/graph-details';
import GraphToolbar from '../graph-toolbar/graph-toolbar';
import NodeDrawerPanel from '../node-drawer-panel/node-drawer-panel';
import { isAuthenticated, getUserId } from '../../utils/authentication';
import { getUserProgressInfo } from '../../services/user-service';

export const CytoscapeContext = React.createContext();

const Graph = (props) => {
  const { viewOnly, id } = props;

  const [cy, setCy] = useState(null);
  const [elements, setElements] = useState(null);
  const [toggleGraphDetails, setToggleGraphDetails] = useState(false);
  const [completedNodes, setCompletedNodes] = useState([]);
  const [isProgressMode, setIsProgressMode] = useState(false);
  const [graphId, setGraphId] = useState('');
  const [selectedNode, setSelectedNode] = useState({});
  const [graphName, setGraphName] = useState('');
  const [graphDescription, setGraphDescription] = useState('');

  // Adds drawable edges to nodes
  const enableEdgehandles = () => {
    if (!cy.edgehandles) {
      cytoscape.use(edgehandles);
      const edgehandler = cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  };

  const selectNode = (node) => {
    setSelectedNode({ ...node });
  };

  const initCytoscapeExtensions = () => {
    // Layouts & extensions
    cytoscape.use(dagre);
    // cytoscape.use(automove);
    // // Prevent moving nodes out of viewport
    // cy.automove({
    //   // eslint-disable-next-line no-unused-vars
    //   nodesMatching(node) { return true; },
    //   reposition: 'viewport',
    // });
  };

  const initEditMode = () => {
    enableEdgehandles();
  };

  const initViewMode = () => {
    cy.autolock(true);
  };

  const initProgressMode = async () => {
    // Mark each node as completed
    setIsProgressMode(true);

    const nodesInMap = cy.nodes().values();
    const nodeArray = Array.from(nodesInMap);

    nodeArray.forEach((node) => {
      const nodeData = node.data();
      if (completedNodes.includes(nodeData.id)) {
        node.style('background-color', 'red');
      }
    });
  };

  const addGraphToProgress = async () => {
    const initGraph = await addGraphToGraphProgress(graphId, getUserId());
    if (initGraph.res) {
      initProgressMode();
    }
  };

  const toggleDrawer = () => {
    setToggleGraphDetails(!toggleGraphDetails);
  };

  // This useEffect is used to get the elements needed to render the graph.
  // cy will be undefined in this useEffect block so don't call it here.
  useEffect(() => {
    setGraphId(id);

    // Use the graphId from the url to load the associated graph
    loadGraphElements(id).then((data) => {
      setElements([...data.graph.nodes, ...data.graph.edges]);
      setGraphName(data.graph.name);
      setGraphDescription(data.graph.description);
    });

    // If user is logged in check if this graph exists in the users progress info
    if (isAuthenticated() && viewOnly) {
      const userId = getUserId();
      getUserProgressInfo(userId).then((res) => {
        const { graphs_progressing: graphs } = res;
        graphs.filter((graph) => {
          if (graph._id === graphId) {
            setCompletedNodes(graph.completedNodes);
            setIsProgressMode(true);
            initProgressMode();
          }
          return null;
        });
      });
    }
  }, []);

  // This useEffect block is to facilitate calls on cy.
  useEffect(() => {
    // Ensures that cytoscape has been initialised before calling below
    if (!cy) return undefined;
    if (!cy.ready()) return undefined;

    initCytoscapeExtensions();
    cy.style(edgeHandleStyle);

    if (viewOnly) {
      initViewMode();
    } else {
      initEditMode();
    }
  }, [cy]);

  return (
    <CytoscapeContext.Provider value={cy}>
      <Grid container justify="center">
        {cy && (
        <Grid item>
          <Drawer anchor="left" open={toggleGraphDetails} variant="persistent">
            <GraphDetails
              graphName={graphName}
              graphDescription={graphDescription}
              viewOnly={viewOnly}
              addGraphToProgress={addGraphToProgress}
              progressMode={isProgressMode}
              cy={cy}
            />
          </Drawer>
        </Grid>
        )}

        {cy && (
          <Grid item>
            <Drawer
              anchor="right"
              open={Boolean(selectedNode.id)}
              variant="persistent"
            >
              <NodeDrawerPanel nodeData={selectedNode} cy={cy} progressMode={isProgressMode} completedNodes={completedNodes} viewOnly={viewOnly} />
            </Drawer>
          </Grid>
        )}

        {/* Inline style has to be used here unfortunately */}
        <Grid item className={toggleGraphDetails ? 'drawer-open' : 'drawer-close'} style={toggleGraphDetails ? { marginLeft: '740px' } : {}}>
          <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '481px' } : {}}>
            {cy && (
              <GraphToolbar
                viewOnly={viewOnly}
                graphId={graphId}
                selectNode={selectNode}
                toggleDrawer={toggleDrawer}
                cy={cy}
              />
            )}
            {elements && (
            <CytoscapeComponent
              className="graph"
              elements={elements}
              cy={(cyto) => {
                setCy(cyto);
              }}
            />
            )}

          </Grid>
        </Grid>
      </Grid>
    </CytoscapeContext.Provider>

  );
};

export default Graph;

Graph.propTypes = {
  id: PropTypes.string.isRequired,
  viewOnly: PropTypes.bool.isRequired,
};
