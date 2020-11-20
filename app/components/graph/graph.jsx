import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import dummyElements from './elements';
import { loadGraphElements, saveGraphElements } from '../../services/graph-service';
import extractNodeDataFromGraphData from '../../utils/graph-utils';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
    };
  }

    componentDidMount = () => {
      this.setState({
        elements: dummyElements,
      });
    };

    saveData = () => {
      saveGraphElements(extractNodeDataFromGraphData(this.cy.json()));
    };

    render() {
      const { elements } = this.state;
      return (
        <>
          <button onClick={this.saveData}>SaveData</button>
          <CytoscapeComponent
            className="graph"
            elements={elements}
            style={{ background: 'black' }}
            cy={(cy) => {
              this.cy = cy;
            }}
          />
        </>
      );
    }
}
