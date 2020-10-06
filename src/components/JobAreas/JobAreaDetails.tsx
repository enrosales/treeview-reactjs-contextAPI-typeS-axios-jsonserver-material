import React, { useState, useEffect } from 'react';
//context
import { useGlobalContext } from '../../context/GlobalState';
//utils
import {
  getEmployeesFromCompanyAndJobArea,
  totalOfProjectsInArea,
} from '../../utils';
//types
import { IEmployee } from '../../types/employeesTypes';

// del total de empleados de esta area, contar en cuantos proyectos diferentes estan particpando
// ir uno a uno e ir revisando a que proyecto pertenece, e irlos contando siempre que sean diferentes...
export default function JobAreaDetails() {
  const { nodeSelected, employees, projects } = useGlobalContext();
  const [employeesInJobArea, setEmployeesInJobArea] = useState<IEmployee[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const _emp = getEmployeesFromCompanyAndJobArea(
      nodeSelected.companyId,
      nodeSelected.id,
      employees
    );
    setEmployeesInJobArea(_emp);
  }, [nodeSelected]);

  useEffect(() => {
    setTotalProjects(totalOfProjectsInArea(employeesInJobArea, projects));
  }, [employeesInJobArea]);

  return (
    <div>
      Job Area Details:
      <br />
      <br />
      <span>
        Total of employees in this area:{' '}
        <strong>{employeesInJobArea.length} </strong>{' '}
      </span>
      <br />
      <br />
      Total of projects in this area:{' '}
      <span>
        <strong>{totalProjects} </strong>{' '}
      </span>
    </div>
  );
}
