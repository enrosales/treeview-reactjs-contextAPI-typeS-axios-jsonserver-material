import React from 'react';
//components
import Header from './Header';
import CompanyWrapper from '../Companies/CompanyWrapper';
import JobAreaDetails from '../JobAreas/JobAreaDetails';
import EmployeeInfo from '../Employees/EmployeeInfo';
//Context
import { useGlobalContext } from '../../context/GlobalState';

export default function DetailsPanel() {
  const { nodeSelected } = useGlobalContext();
  switch (nodeSelected.nodeSelected) {
    case 'None':
      return <Header />;
    case 'Company':
      return <CompanyWrapper />;
    case 'JobArea':
      return <JobAreaDetails />;
    case 'Employee':
      return <EmployeeInfo />;
    default:
      return <Header />;
  }
}
