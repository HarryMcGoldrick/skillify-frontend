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
    selector: '.completed',
    style: {
      'background-color': 'red',
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
      'background-blacken': 0.3,
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
    selector: '.incomplete',
    style: {
      // TODO add style in here for incomplete nodes
    },
  },
];

export default style;
