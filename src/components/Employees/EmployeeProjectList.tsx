import React, { useEffect, useState } from 'react';
//types
import { IProject } from '../../types/projectsTypes';
import { totalProjectsByEmployee } from '../../utils';
//context
import { useGlobalContext } from '../../context/GlobalState';

export default function EmployeeProjectList() {
  const { nodeSelected, projects } = useGlobalContext();
  const [projectList, setProjectList] = useState<IProject[]>();
  useEffect(() => {
    setProjectList(totalProjectsByEmployee(projects, nodeSelected.id));
  }, [nodeSelected]);

  return (
    <>
      <p>
        {projectList && projectList.length === 0
          ? "Haven't project..."
          : 'List of Projects:'}
      </p>
      {projectList && projectList.length > 0 && (
        <ul>
          {projectList.map((p: IProject) => (
            <li>{p.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
