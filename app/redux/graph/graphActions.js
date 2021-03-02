import {
  ADD_NODE, ADD_COMPLETED_NODE, REMOVE_NODE, SELECT_NODE, TOGGLE_GRAPH_DETAILS, UPDATE_ELEMENTS, UPDATE_PROGRESS_MODE, REMOVE_COMPLETED_NODE, UPDATE_NODE, UPDATE_NODE_STYLE, ADD_STYLE, UPDATE_STYLE_SHEET, ADD_CONTENT_TO_NODE,
} from './graphTypes';

export const selectNode = (node) => ({
  type: SELECT_NODE,
  payload: node,
});

export const addNode = (pos) => {
  const newNode = {
    data: {},
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
  payload: styleElement
});

export const updateStyleSheet = (styleSheet) => ({
  type: UPDATE_STYLE_SHEET,
  payload: styleSheet
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
  payload: nodeId
})

export const removeNodeFromCompletedNodes = (nodeId) => ({
  type: REMOVE_COMPLETED_NODE,
  payload: nodeId
})

export const addContentToNodeAction = (content) => ({
  type: ADD_CONTENT_TO_NODE,
  payload: content,
})
