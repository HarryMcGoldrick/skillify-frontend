import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { Drawer, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import dagre from 'cytoscape-dagre';
import automove from 'cytoscape-automove';
import { loadGraphElements, updateGraphElements } from '../../services/graph-service';
import extractDiagramDataFromGraphData from '../../utils/graph-data';
import edgeHandleStyle from './styles';
import { tools } from '../../enums/tools';
import GraphDetails from '../graph-details/graph-details';
import GraphToolbar from '../graph-toolbar/graph-toolbar';

import { getYoutubeVideoForNode } from '../../services/content-service';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      selectedNode: {},
      selectedLayout: '',
    };
  }

  componentDidMount = () => {
    const { id } = this.props;
    cytoscape.use(dagre);
    cytoscape.use(automove);
    this.cy.automove({
      // eslint-disable-next-line no-unused-vars
      nodesMatching(node) { return true; },
      reposition: 'viewport',
    });

    // Use the graphId from the url to load the associated graph
    loadGraphElements(id).then((data) => {
      const graphName = data.graph.name;
      const cytoscapeData = [...data.graph.nodes, ...data.graph.edges];
      this.setState({
        elements: cytoscapeData,
        graphName,
      });
      this.centerOnGraph();
    });
    this.enableEdgehandles();
    this.switchTool(tools.SELECT);
  };

  // Saves the changes made to a graph
  updateData = () => {
    const { id } = this.props;
    updateGraphElements(id, extractDiagramDataFromGraphData(this.cy.json()));
  }

  // Get relevant youtube content for a node label
  getYoutubeContentForNode = (label) => {
    getYoutubeVideoForNode(label).then((res) => {
      this.setState({ youtubeNodeData: res.data.response.items[0] });
    });
  }

  // Adds drawable edges to nodes
  enableEdgehandles = () => {
    if (!this.cy.edgehandles) {
      cytoscape.use(edgehandles);
      this.cy.style(edgeHandleStyle);
      const edgehandler = this.cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  }

  // Updates the node label
  updateSelectedNode = (data) => {
    const { selectedNode } = this.state;
    const { id } = selectedNode;
    const node = this.cy.elements(`node[id = "${id}"]`)[0];
    if (node) {
      node.data('label', data.nodeLabel);
    }
  }

  // Remove the event listeners added by the tools - enables switching of tools
  removeListeners = () => {
    this.cy.removeListener('tap');
    this.cy.removeListener('click');
  }

  // Sets the currentNode state object when a node is clicked
  selectNodeTool = () => {
    this.cy.on('click', 'node', (event) => {
      // Prevent edgehandle from being selected
      if (event.target.classes()[0] === 'eh-handle') {
        return;
      }

      const currentNode = event.target.data();
      const { selectedNode } = this.state;
      if (currentNode && currentNode.id === selectedNode.id) {
        // Deselect node
        this.setState({ selectedNode: {} });
      } else {
        this.setState({ selectedNode: { ...currentNode } });
        this.getYoutubeContentForNode(currentNode.label);
      }
    });
  }

  // Adds a node onto the graph
  addNodeTool = () => {
    this.cy.on('tap', (event) => {
      if (event.target === this.cy) {
        const { x, y } = event.position;
        this.cy.add({
          group: 'nodes',
          position: { x, y },
          data: { label: 'test' },
        });
      }
    });
  }

  // Removes nodes and edges on click
  deleteNodeAndEdgeTool = () => {
    this.cy.on('tap', (event) => {
      if (event.target !== this.cy) {
        this.cy.remove(event.target);
      }
    });
  }

  // Used to remove listeners and switch tools
  switchTool = (tool) => {
    // Remove previous tools
    this.removeListeners();

    switch (tool) {
      case tools.SELECT:
        this.selectNodeTool();
        break;
      case tools.ADD:
        this.addNodeTool();
        break;
      case tools.DELETE:
        this.deleteNodeAndEdgeTool();
        break;
      default:
        break;
    }
  }

  switchLayout = (layout) => {
    this.setState({ selectedLayout: layout });
  }

  runLayout = () => {
    const { selectedLayout } = this.state;
    if (selectedLayout) {
      this.cy.layout({ name: selectedLayout }).run();
      this.centerOnGraph();
    }
  }

  centerOnGraph = () => {
    // TODO Need to tinker with this more
    this.cy.fit();
  }

  render() {
    const {
      elements, selectedNode, graphName, youtubeNodeData,
    } = this.state;

    const isNodeSelected = selectedNode.id;

    const { viewOnly } = this.props;

    return (
      <Grid container justify="center">
        <Grid item>
          <Drawer anchor="left" open={Boolean(isNodeSelected)} variant="persistent">
            <GraphDetails
              graphName={graphName}
              selectedNode={selectedNode}
              updateSelectedNode={this.updateSelectedNode}
              youtubeContentData={youtubeNodeData}
              viewOnly={viewOnly}
            />
          </Drawer>
        </Grid>

        {/* Inline style has to be used here unfortunately */}
        <Grid item className={isNodeSelected ? 'drawer-open' : 'drawer-close'} style={isNodeSelected ? { marginLeft: '600px' } : {}}>

          {!viewOnly && (
          <GraphToolbar
            switchTool={this.switchTool}
            updateData={this.updateData}
            switchLayout={this.switchLayout}
            runLayout={this.runLayout}
          />
          )}

          <CytoscapeComponent
            className="graph"
            elements={elements}
            cy={(cy) => {
              this.cy = cy;
            }}
          />
        </Grid>
      </Grid>

    );
  }
}

Graph.propTypes = {
  id: PropTypes.string.isRequired,
  viewOnly: PropTypes.bool.isRequired,
};
