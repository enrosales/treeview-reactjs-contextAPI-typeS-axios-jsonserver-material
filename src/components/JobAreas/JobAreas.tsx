import React from 'react';
//Material
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
//context
import { useGlobalContext } from '../../context/GlobalState';
//components
import Employees from '../Employees/Employees';
//utils
import { getNodeIdFormSelectedNode, getJobAreas } from '../../utils/';

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

export default function JobAreas(props: any) {
  const { companyId } = props;
  const classes = useTreeItemStyles();
  const { employees } = useGlobalContext();
  const jobAreas = getJobAreas(companyId, employees);
  return (
    <>
      {jobAreas && jobAreas.length > 0
        ? jobAreas.map(area => (
            <TreeItem
              key={area}
              nodeId={getNodeIdFormSelectedNode('JobArea', companyId, area)}
              label={
                <div className={classes.labelRoot}>
                  {<WorkIcon />}
                  <Typography variant='body2' className={classes.labelText}>
                    {area}
                  </Typography>
                </div>
              }
            >
              <Employees companyId={companyId} area={area} />
            </TreeItem>
          ))
        : ''}
    </>
  );
}
