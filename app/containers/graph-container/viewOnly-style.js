const style = [
  {
    selector: 'node[label]',
    style: {
      content: 'data(label)',
    },
  },
  {
    selector: 'node[type = "ROOT"]',
    style: {
      content: 'data(label)',
      'border-width': '2',
      'border-color': 'green',
    },
  },
  {
    selector: '.locked',
    style: {
      'background-blacken': 0.7,
    },
  },
  {
    selector: '.unlocked',
    style: {
      'background-color': 'blue',
      'line-color': 'blue',
      'target-arrow-color': 'blue',
    },
  },
  {
    selector: '.completed',
    style: {
      'background-color': 'green',
      'line-color': 'green',
      'target-arrow-color': 'green',
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
];

export default style;
