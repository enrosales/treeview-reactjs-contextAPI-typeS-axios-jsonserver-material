import { AppActions } from '../constants';
import { IEmployee } from '../types/employeesTypes';

export default (state: IEmployee[], action: any): IEmployee[] => {
  switch (action.type) {
    case AppActions.FETCH_EMPLOYEES:
      return action.payload;
    default:
      return state;
  }
};
