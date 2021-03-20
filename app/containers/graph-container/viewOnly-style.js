const style = [
  {
    selector: 'node[label]',
    style: {
      content: 'data(label)',
    },
  },
  {
    selector: ':selected',
    style: {
      'border-width': '2',
      'border-color': 'red',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 3,
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
    },
  },
  {
    selector: '.completed',
    style: {
      'background-color': 'red',
    },
  },
  {
    selector: '.incomplete',
    style: {
      // TODO add style in here for incomplete nodes
    },
  },
];

export default style;
