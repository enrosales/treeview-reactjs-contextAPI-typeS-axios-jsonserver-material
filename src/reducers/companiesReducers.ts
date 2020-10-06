import { AppActions } from '../constants';
import { ICompany } from '../types/companyTypes';

export default (state: ICompany[], action: any): ICompany[] => {
  switch (action.type) {
    case AppActions.FETCH_COMPANIES:
      return action.payload;
    default:
      return state;
  }
};
