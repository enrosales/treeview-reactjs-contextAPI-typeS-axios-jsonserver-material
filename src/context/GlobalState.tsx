import React, {
  createContext,
  useEffect,
  useMemo,
  useContext,
  useReducer,
} from 'react';

//reducers
import addressReducer from '../reducers/addressReducer';
import companiesReducers from '../reducers/companiesReducers';
import employeesReducers from '../reducers/employeesReducers';
import nodeSelectedReducers from '../reducers/nodeSelectedReducers';
import projectsReducers from '../reducers/projectsReducers';

//types
import { INodeSelected } from '../types/nodeTypes';
import { ICompany } from '../types/companyTypes';
import { IAddress } from '../types/addressTypes';
import { IProject } from '../types/projectsTypes';
import { IEmployee } from '../types/employeesTypes';

//constants
import { AppActions } from '../constants';

//actions
import { getCompanies } from '../actions/companiesActions';
import { getEmployees } from '../actions/employeesActions';
import { getCompanyAddress } from '../actions/addressActions';
import {
  getProjectsByCompany,
  addProjectToCompany,
  updateProject,
  removeProject,
} from '../actions/projectsActions';

//local states
const initialAddress: IAddress[] = [];
const inititalCompanies: ICompany[] = [];
const initialEmployees: IEmployee[] = [];
const initialNodeSelected: INodeSelected = {
  companyId: '',
  nodeSelected: 'None',
  id: '',
};
const inititalProjects: IProject[] = [];

//globalstate to export to components
const globalState = {
  companies: inititalCompanies,
  address: initialAddress,
  employees: initialEmployees,
  nodeSelected: initialNodeSelected,
  projects: inititalProjects,
  setSelectedNode: function (node: INodeSelected) {
    return node;
  },
  setCompanyAddress: async function (companyId: string) {
    return initialAddress;
  },
  getProjectsByCompanyId: async function (companyId: string) {
    return inititalProjects;
  },
  addProject: async function (project: IProject) {
    return [];
  },
  editProject: async function (project: IProject) {
    return [];
  },
  deleteProject: async function (project: IProject) {
    return [];
  },
};

export const GlobalContext = createContext(globalState);

const AppDataProvider = (props: any) => {
  const [address, dispatchAddress] = useReducer(addressReducer, initialAddress);
  const [companies, dispatchCompanies] = useReducer(
    companiesReducers,
    inititalCompanies
  );
  const [employees, dispatchEmployees] = useReducer(
    employeesReducers,
    initialEmployees
  );
  const [nodeSelected, dispatchNodeSelected] = useReducer(
    nodeSelectedReducers,
    initialNodeSelected
  );
  const [projects, dispatchProjects] = useReducer(
    projectsReducers,
    inititalProjects
  );

  /*The first time the component rendered it tries to find the data from a source
   */
  useEffect(() => {
    //loadCompanies and employees for the first time
    const loadCompanies = async () => {
      let _companies = await getCompanies();
      dispatchCompanies({
        type: AppActions.FETCH_COMPANIES,
        payload: _companies,
      });
    };
    const loadEmployees = async () => {
      let _employees = await getEmployees();
      dispatchEmployees({
        type: AppActions.FETCH_EMPLOYEES,
        payload: _employees,
      });
    };
    loadCompanies();
    loadEmployees();
  }, []);

  const setSelectedNode = (node: INodeSelected) => {
    dispatchNodeSelected({
      type: AppActions.SET_NODE_SELECTED,
      payload: node,
    });
  };

  const setCompanyAddress = async (companyId: string) => {
    const _address = await getCompanyAddress(companyId);
    dispatchAddress({
      type: AppActions.SET_COMPANY_ADDRESS,
      payload: _address,
    });
  };

  const getProjectsByCompanyId = async (companyId: string) => {
    const _projects = await getProjectsByCompany(companyId);
    dispatchProjects({
      type: AppActions.FETCH_PROJECTS,
      payload: _projects,
    });
  };

  const addProject = async (project: IProject) => {
    const newProject = await addProjectToCompany(project);
    dispatchProjects({
      type: AppActions.ADD_PROJECT,
      payload: newProject,
    });
  };
  const editProject = async (project: IProject) => {
    const projectToEdit = await updateProject(project);
    dispatchProjects({
      type: AppActions.UPDATE_PROJECT,
      payload: projectToEdit,
    });
  };

  const deleteProject = async (project: IProject) => {
    await removeProject(project.id);
    dispatchProjects({
      type: AppActions.DELETE_PROJECT,
      payload: project,
    });
  };

  const appDataValues = useMemo(() => {
    return {
      companies,
      address,
      projects,
      employees,
      nodeSelected,
      setSelectedNode,
      setCompanyAddress,
      getProjectsByCompanyId,
      addProject,
      editProject,
      deleteProject,
    };
  }, [companies, address, projects, employees, nodeSelected]);

  return (
    <GlobalContext.Provider value={appDataValues} {...props}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default AppDataProvider;
