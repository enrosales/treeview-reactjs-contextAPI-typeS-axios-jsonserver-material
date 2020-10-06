import React, { useEffect } from 'react';
//Material
import MaterialTable from 'material-table';
import { tableIcons } from '../../constants/tableIcons';
//components
import EmployeeTable from '../Employees/EmployeeTable';
//Types
import { IProject } from '../../types/projectsTypes';
//context
import { useGlobalContext } from '../../context/GlobalState';

export default function CompanyProjects() {
  const {
    getProjectsByCompanyId,
    nodeSelected,
    projects,
    addProject,
    editProject,
    deleteProject,
  } = useGlobalContext();

  useEffect(() => {
    const loadProjects = async () => {
      getProjectsByCompanyId(nodeSelected.companyId);
    };
    loadProjects();
  }, [nodeSelected]);

  const handleAddProject = (newData: IProject) =>
    new Promise(resolve => {
      const newProject = {
        ...newData,
        employees: [],
        companyId: nodeSelected.companyId,
      };
      addProject(newProject);
      resolve();
    });

  const handleRemoveProject = (oldData: IProject) =>
    new Promise(resolve => {
      deleteProject(oldData);
      resolve();
    });

  const handleUpdateProject = (
    newData: IProject,
    oldData: IProject | undefined
  ) => {
    const { name, department, companyId, employees, id } = newData;
    return new Promise(resolve => {
      if (oldData) {
        const { name: oldName, department: oldDepartment } = oldData;
        if (name !== oldName || department !== oldDepartment) {
          const projectToUpdate: IProject = {
            companyId,
            department,
            employees,
            id,
            name,
          };
          editProject(projectToUpdate);
        }
      }
      resolve();
    });
  };

  const validateDepartment = (rowData: IProject) => {
    const { department } = rowData;
    const isDepartmentValid = department && department.length > 3;
    if (!isDepartmentValid) {
      return {
        isValid: false,
        helperText: 'Department must be longer than 3 chars',
      };
    }
    return true;
  };

  const validateName = (rowData: IProject) => {
    const { name } = rowData;
    const isNameValid = name && name.length > 3;
    if (!isNameValid) {
      return {
        isValid: false,
        helperText: 'Name must be longer than 3 chars',
      };
    }
    return true;
  };

  return (
    <MaterialTable
      title='Projects'
      columns={[
        { title: 'Name', field: 'name', validate: validateName },
        {
          title: 'Department',
          field: 'department',
          validate: validateDepartment,
        },
      ]}
      data={projects}
      options={{
        actionsColumnIndex: -1,
        paging: false,
      }}
      icons={tableIcons}
      detailPanel={rowData => <EmployeeTable rowData={rowData} />}
      editable={{
        onRowAdd: handleAddProject,
        onRowUpdate: handleUpdateProject,
        onRowDelete: handleRemoveProject,
      }}
    />
  );
}
