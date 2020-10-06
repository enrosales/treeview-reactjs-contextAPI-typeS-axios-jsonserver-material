import React, { useEffect, useState } from 'react';
//Material
import TreeItem from '@material-ui/lab/TreeItem';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
//components
import { IEmployee } from '../../types/employeesTypes';
//context
import { useGlobalContext } from '../../context/GlobalState';
//utils
import {
  getEmployeesFromCompanyAndJobArea,
  getNodeIdFormSelectedNode,
} from '../../utils';
//styles
const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  })
);

export default function Employees(props: any) {
  const classes = useTreeItemStyles();
  const { employees: totalEmployees } = useGlobalContext();
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const { companyId, area } = props;

  useEffect(() => {
    setEmployees(
      getEmployeesFromCompanyAndJobArea(companyId, area, totalEmployees)
    );
  }, [area, companyId, totalEmployees]);

  return (
    <>
      {employees && employees.length > 0
        ? employees.map(el => (
            <TreeItem
              key={el.id}
              nodeId={getNodeIdFormSelectedNode('Employee', companyId, el.id)}
              label={
                <div className={classes.labelRoot}>
                  {<PersonIcon />}
                  <Typography variant='body2' className={classes.labelText}>
                    {`${el.firstName} ${el.lastName}`}
                  </Typography>
                </div>
              }
            />
          ))
        : `Loading`}
    </>
  );
}
