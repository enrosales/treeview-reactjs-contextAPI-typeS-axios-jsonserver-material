import { AppActions } from '../constants';
import { IProject } from '../types/projectsTypes';

export default (state: IProject[], action: any) => {
  switch (action.type) {
    case AppActions.FETCH_PROJECTS:
      return action.payload;
    case AppActions.ADD_PROJECT:
      return state.concat(action.payload);
    case AppActions.UPDATE_PROJECT:
      const index = state.findIndex(p => p.id === action.payload.id);
      state[index] = action.payload;
      return [...state];
    case AppActions.DELETE_PROJECT:
      return state.filter(p => p.id !== action.payload.id);
    default:
      return state;
  }
};
