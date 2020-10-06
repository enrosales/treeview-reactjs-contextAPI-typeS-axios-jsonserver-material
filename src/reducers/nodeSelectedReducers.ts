import { AppActions } from '../constants';
import { INodeSelected } from '../types/nodeTypes';

export default (state: INodeSelected, action: any): INodeSelected => {
  switch (action.type) {
    case AppActions.SET_NODE_SELECTED:
      return action.payload;
    default:
      return state;
  }
};
