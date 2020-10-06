import { employees, projects } from '../test-data';

import {
  getEmployeeById,
  getEmployeesFromCompanyAndJobArea,
  getEmployeesFromProject,
  getNodeIdFormSelectedNode,
  totalOfProjectsInArea,
  totalProjectsByEmployee,
} from '../utils';

import deepEquality from '../utils/deepEquality';

import { IEmployee } from '../modules/employees/types';

describe('utils', () => {
  it('function getEmployeeById', () => {
    const expectedEmployee = employees[0];
    const employee = getEmployeeById(employees, '1');
    expect(deepEquality(expectedEmployee, employee)).toBeTruthy();
  });

  it('function getEmployeesFromCompanyAndJobArea with one employee', () => {
    const expectedEmployee = employees[0];
    const matchEmployees = getEmployeesFromCompanyAndJobArea(
      '1',
      'Web',
      employees
    );
    const employee: IEmployee = matchEmployees[0];
    expect(deepEquality(expectedEmployee, employee)).toBeTruthy();
  });

  it('function getEmployeesFromCompanyAndJobArea with multiple employees', () => {
    const expectedEmployeeIds: string[] = ['1', '4'];
    const matchEmployees = getEmployeesFromCompanyAndJobArea(
      '1',
      'Web',
      employees
    );
    const employeesIds: string[] = matchEmployees.map(emp => emp.id);
    expect(expectedEmployeeIds).toStrictEqual(employeesIds);
  });

  it('function getEmployeesFromProject', () => {
    const expectedEmployee = ['2', '3'];
    const matchEmployees = getEmployeesFromProject(['2', '3'], employees);
    const _employees = matchEmployees.map(emp => emp.id);
    expect(deepEquality(expectedEmployee, _employees)).toBeTruthy();
  });

  it('function getNodeIdFormSelectedNode', () => {
    const expectedNodeId = 'Company*1*1';
    const nodeId = getNodeIdFormSelectedNode('Company', '1', '1');
    expect(expectedNodeId).toStrictEqual(nodeId);
  });

  it('function totalOfProjectsInArea', () => {
    const expectedResult = 3;
    const totalOfProjects = totalOfProjectsInArea(employees, projects);
    expect(expectedResult).toBe(totalOfProjects);
  });

  it('function totalProjectsByEmployee', () => {
    const expectedResult = ['3', '4'];
    const totalOfProjectsByEmp = totalProjectsByEmployee(projects, '2');
    const emp = totalOfProjectsByEmp.map(p => p.id);
    expect(expectedResult).toStrictEqual(emp);
  });
});
