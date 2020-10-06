import * as API from '../api/api';
import { AppActions } from '../constants';

export const getCompanies = () => async (dispatch: any): Promise<void> => {
  const { data: companies } = await API.getCompanies();
  return dispatch({ type: AppActions.FETCH_COMPANIES, payload: companies });
};
