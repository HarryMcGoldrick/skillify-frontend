import { FETCH_USER_DATA_SUCCESS } from './userTypes';
import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        graphsContent: action.payload.graphs_created,
        likedContent: action.payload.likedContent,
        username: action.payload.username,
      };
    }

    default: return state;
  }
};

export default reducer;
