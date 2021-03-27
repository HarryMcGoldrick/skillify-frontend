import {
  ADD_NODE, ADD_COMPLETED_NODE, REMOVE_NODE, SELECT_NODE, TOGGLE_GRAPH_DETAILS, UPDATE_ELEMENTS, UPDATE_PROGRESS_MODE, REMOVE_COMPLETED_NODE, UPDATE_NODE, UPDATE_NODE_STYLE, ADD_STYLE, UPDATE_STYLE_SHEET, UPDATE_SELECTED_NODE_PATH,
} from './graphTypes';

export const selectNode = (node) => ({
  type: SELECT_NODE,
  payload: node,
});

export const addNode = (pos, type) => {
  const newNode = {
    data: {
      type,
      label: 'New Node',
    },
    position: pos,
  };
  return {
    type: ADD_NODE,
    payload: newNode,
  };
};

export const removeNode = (id) => ({
  type: REMOVE_NODE,
  payload: id,
});

export const updateNode = (node) => ({
  type: UPDATE_NODE,
  payload: node,
});

export const addStyle = (styleElement) => ({
  type: ADD_STYLE,
  payload: styleElement,
});

export const updateStyleSheet = (styleSheet) => ({
  type: UPDATE_STYLE_SHEET,
  payload: styleSheet,
});

export const updateElements = (elements) => ({
  type: UPDATE_ELEMENTS,
  payload: elements,
});

export const toggleGraphDetails = () => ({
  type: TOGGLE_GRAPH_DETAILS,
});

export const updateProgressMode = (mode) => ({
  type: UPDATE_PROGRESS_MODE,
  payload: mode,
});

export const addNodeToCompletedNodes = (nodeId) => ({
  type: ADD_COMPLETED_NODE,
  payload: nodeId,
});

export const removeNodeFromCompletedNodes = (nodeId) => ({
  type: REMOVE_COMPLETED_NODE,
  payload: nodeId,
});

export const updateSelectedNodePath = (nodes) => ({
  type: UPDATE_SELECTED_NODE_PATH,
  payload: nodes,
});
