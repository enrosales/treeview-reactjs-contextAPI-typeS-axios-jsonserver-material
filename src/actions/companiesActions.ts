import * as API from '../api/api';

export const getCompanies = async () => {
  const { data: companies } = await API.getCompanies();
  return companies;
};
