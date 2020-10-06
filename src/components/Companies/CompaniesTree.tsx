import React from 'react';
//Material
import TreeItem from '@material-ui/lab/TreeItem';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//context
import { useGlobalContext } from '../../context/GlobalState';
//components
import JobAreas from '../JobAreas/JobAreas';
//utils
import { getNodeIdFormSelectedNode } from '../../utils';

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

export default function Companies() {
  const { companies } = useGlobalContext();
  const classes = useTreeItemStyles();
  return (
    <>
      {companies &&
        companies.length > 0 &&
        companies.map(c => (
          <TreeItem
            key={c.id}
            nodeId={getNodeIdFormSelectedNode('Company', c.id, c.id)}
            label={
              <div className={classes.labelRoot}>
                {<BusinessIcon />}
                <Typography variant='body2' className={classes.labelText}>
                  {c.name}
                </Typography>
              </div>
            }
          >
            <JobAreas companyId={c.id} />
          </TreeItem>
        ))}
    </>
  );
}
