import * as API from '../api/api';
import { IProject } from '../types/projectsTypes';

export const getProjectsByCompany = async (companyId: string) => {
  const { data: projects } = await API.getCompanyProjects(companyId);
  return projects;
};

export const addProjectToCompany = async (project: IProject) => {
  const { data: _project } = await API.addProject(project);
  return _project;
};

export const updateProject = async (project: IProject) => {
  const { data: _project } = await API.updateProject(project);
  return _project;
};

export const removeProject = async (projectId: string) => {
  await API.removeProject(projectId);
};
