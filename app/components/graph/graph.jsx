import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { loadGraphElements, updateGraphElements } from '../../services/graph-service';
import { extractDiagramDataFromGraphData } from '../../utils/graph-data';
import edgeHandleStyle from './styles';
import { tools } from '../../enums/tools';
import GraphDetails from '../graph-details';
import { getYoutubeVideoForNode } from '../../services/content-service';
import GraphToolbar from '../graph-toolbar';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      selectedNode: {},
    };
  }

  componentDidMount = () => {
    const { id } = this.props;

    // Use the graphId from the url to load the associated graph
    loadGraphElements(id).then((data) => {
      const graphName = data.graph.name;
      const cytoscapeData = [...data.graph.nodes, ...data.graph.edges];
      this.setState({
        elements: cytoscapeData,
        graphName,
      });
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
    getYoutubeVideoForNode(label).then((data) => {
      this.setState({ youtubeNodeData: data.response.items[0] });
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
      this.setState({ selectedNode: { ...currentNode } });
      this.getYoutubeContentForNode(currentNode.label);
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

  render() {
    const {
      elements, selectedNode, graphName, youtubeNodeData,
    } = this.state;

    const { viewOnly } = this.props;

    return (
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
          <GraphDetails
            graphName={graphName}
            selectedNode={selectedNode}
            updateSelectedNode={this.updateSelectedNode}
            youtubeContentData={youtubeNodeData}
            viewOnly={viewOnly}
          />
        </Grid>

        <Grid item xs={9}>
          {!viewOnly && (
          <GraphToolbar switchTool={this.switchTool} updateData={this.updateData} />
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
