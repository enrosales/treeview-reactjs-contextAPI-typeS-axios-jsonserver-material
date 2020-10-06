import * as API from '../api/api';

export const getCompanyAddress = async (companyId: string) => {
  const { data: address } = await API.getCompanyAddress(companyId);
  return address;
};
