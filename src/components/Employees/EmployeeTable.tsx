import React, { useEffect, useState } from 'react';
//components
import { IEmployee } from '../../types/employeesTypes';
//context
import { useGlobalContext } from '../../context/GlobalState';
//utils
import { getEmployeesFromProject } from '../../utils';
//material
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { tableIcons } from '../../constants/tableIcons';

const useStyles = makeStyles({
  employeesTable: {
    backgroundColor: '#cfe8fc',
    padding: 20,
  },
});

export default function EmployeeTable(props: any) {
  const classes = useStyles();
  const { rowData: project } = props;
  const { employees } = useGlobalContext();
  const [employeesFromProject, setEmployeesFromProject] = useState<IEmployee[]>(
    []
  );

  const handleAddEmployeeToProject = (newData: IEmployee) =>
    new Promise(resolve => {
      setEmployeesFromProject(emp => emp.concat(newData));
      resolve();
    });
  const handleUpdateEmployeeFromProject = (
    newData: IEmployee,
    oldData: IEmployee | undefined
  ) => {
    const {
      dateOfBirth,
      firstName,
      jobArea,
      jobTitle,
      jobType,
      lastName,
      id,
      companyId,
    } = newData;
    return new Promise(resolve => {
      if (oldData) {
        const {
          dateOfBirth: oldDateOfBirth,
          firstName: oldFirstName,
          jobArea: oldJobArea,
          jobTitle: oldJobTitle,
          jobType: oldJobType,
          lastName: oldLastName,
        } = oldData;
        if (
          dateOfBirth !== oldDateOfBirth ||
          firstName !== oldFirstName ||
          jobArea !== oldJobArea ||
          jobTitle !== oldJobTitle ||
          jobType !== oldJobType ||
          lastName !== oldLastName
        ) {
          const employeeToUpdate: IEmployee = {
            dateOfBirth,
            firstName,
            jobArea,
            jobTitle,
            jobType,
            lastName,
            companyId,
            id,
          };
          const indexOfEmployeeToUpdate = employeesFromProject.findIndex(
            emp => emp.id === id
          );
          const copyOfEmp = [...employeesFromProject];
          copyOfEmp[indexOfEmployeeToUpdate] = employeeToUpdate;
          setEmployeesFromProject(copyOfEmp);
        }
      }
      resolve();
    });
  };

  const handleRemoveEmployeeFromProject = (oldData: IEmployee) =>
    new Promise(resolve => {
      setEmployeesFromProject(emps =>
        emps.filter(emp => emp.id !== oldData.id)
      );
      resolve();
    });

  useEffect(() => {
    setEmployeesFromProject(
      getEmployeesFromProject(project.employees, employees)
    );
  }, [project]);

  return (
    <div className={classes.employeesTable}>
      <MaterialTable<IEmployee>
        title='Employees'
        columns={[
          { title: 'Name', field: 'firstName' },
          { title: 'Last name', field: 'lastName' },
          /* { title: 'DateOfBirth', field: 'dateOfBirth', type: 'date' },*/
          { title: 'Job Title', field: 'jobTitle' },
          /* { title: 'Job Area', field: 'jobArea' },*/
          /* { title: 'Job Type', field: 'jobType' },*/
        ]}
        icons={tableIcons}
        data={employeesFromProject}
        options={{
          paging: false,
          search: false,
          actionsColumnIndex: -1,
          doubleHorizontalScroll: true,
        }}
        editable={{
          onRowAdd: handleAddEmployeeToProject,
          onRowUpdate: handleUpdateEmployeeFromProject,
          onRowDelete: handleRemoveEmployeeFromProject,
        }}
      />
    </div>
  );
}
