import { AppActions } from '../constants';
export default (state: any, action: any) => {
  switch (action.type) {
    case AppActions.SET_COMPANY_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};
