// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  isViewOnly: false,
  completedNodes: [],
  progressMode: false,
  selectedNode: {},
  showGraphDetails: false,
  elements: [
    {
      data: {
        id: '1',
      },
      position: { x: 300, y: 400 },
    },
    {
      data: {
        id: '2',
      },
      position: { x: 45, y: 300 },
    },
    {
      data: {
        source: 1,
        target: 2,
      },
    },
  ],
};
