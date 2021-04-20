import { FETCH_USER_DATA_SUCCESS } from './userTypes';
import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        graphsCreated: action.payload.graphs_created,
        graphsProgressing: action.payload.graphs_progressing,
        likedContent: action.payload.likedContent,
        username: action.payload.username,
        achievements: action.payload.achievements,
        badges: action.payload.badges,
        completedNodeCount: action.payload.completedNodeCount,
        likedGraphs: action.payload.likedGraphs,
      };
    }

    default: return state;
  }
};

export default reducer;
