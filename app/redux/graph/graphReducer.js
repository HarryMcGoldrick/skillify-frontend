import {
  ADD_NODE, COMPLETE_NODE, COMPLETE_NODE_BATCH, FETCH_GRAPH_SUCCESS, REMOVE_NODE, SELECT_NODE, UPDATE_ELEMENTS, TOGGLE_GRAPH_DETAILS,
} from './graphTypes';
import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };
    case ADD_NODE:
      return {
        ...state,
        elements: [
          ...state.elements,
          action.payload,
        ],
      };
    case REMOVE_NODE: {
      const elements = state.elements.filter((ele) => ele.data.id !== action.payload && ele.data.source !== action.payload && ele.data.target !== action.payload);
      return {
        ...state,
        elements: [
          ...elements,
        ],
      };
    }
    case UPDATE_ELEMENTS:
      return {
        ...state,
        elements: [...action.payload],
      };
    case FETCH_GRAPH_SUCCESS:
      return {
        ...state,
        elements: action.payload.elements,
        graphData: action.payload.graphData,
      };
    case COMPLETE_NODE:
      return {
        ...state,
        completedNodes: [
          ...state.completedNodes,
          action.payload,
        ],
      };
    case COMPLETE_NODE_BATCH:
      return {
        ...state,
        completedNodes: [
          ...state.completedNodes,
          ...action.payload,
        ],
      };
    case TOGGLE_GRAPH_DETAILS:
      return {
        ...state,
        showGraphDetails: !state.showGraphDetails,
      };
    case TOGGLE_GRAPH_DETAILS:
      return {
        ...state,
        progressMode: !state.progressMode,
      };

    default: return state;
  }
};

export default reducer;
