import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import { loadGraphElements, saveGraphElements } from '../../services/graph-service';
import extractDiagramDataFromGraphData from '../../utils/graph-utils';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
    };
  }

    componentDidMount = () => {
      loadGraphElements('5fb7fceabf6a047001b14ae4').then((data) => {
        const cytoscapeData = [...data.graph.nodes, ...data.graph.edges];
        this.setState({
          elements: cytoscapeData,
        });
      });
    };

    saveData = () => {
      saveGraphElements(extractDiagramDataFromGraphData(this.cy.json()));
    };

    render() {
      const { elements } = this.state;
      return (
        <>
          <button onClick={this.saveData}>SaveData</button>
          <CytoscapeComponent
            className="graph"
            elements={elements}
            // style={{ background: 'black' }}
            cy={(cy) => {
              this.cy = cy;
            }}
          />
        </>
      );
    }
}
