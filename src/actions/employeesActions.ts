import * as API from '../api/api';

export const getEmployees = async () => {
  const { data: employees } = await API.getEmployees();
  return employees;
};
