import {
  ADD_NODE, FETCH_GRAPH_SUCCESS, REMOVE_NODE, SELECT_NODE, UPDATE_ELEMENTS,
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
    default: return state;
  }
};

export default reducer;
