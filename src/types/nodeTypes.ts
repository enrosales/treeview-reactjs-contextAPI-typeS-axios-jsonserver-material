export type NodeType = 'None' | 'Company' | 'JobArea' | 'Employee';

export type INodeSelected = {
  nodeSelected: NodeType;
  companyId: string;
  id: string;
};
