import React, { useEffect, useState } from 'react';
//utils
import { getEmployeeById } from '../../utils';
//context
import { useGlobalContext } from '../../context/GlobalState';
//material
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//types
import { IEmployee } from '../../types/employeesTypes';
import EmployeeProjectList from './EmployeeProjectList';

//styles
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function EmployeeInfo() {
  const [employee, setEmployee] = useState<IEmployee | null>();
  const { nodeSelected, employees } = useGlobalContext();

  useEffect(() => {
    setEmployee(getEmployeeById(employees, nodeSelected.id));
  }, [nodeSelected]);

  const classes = useStyles();
  return (
    <>
      {employee && (
        <>
          <Card className={classes.root} variant='outlined'>
            <CardContent>
              <Typography variant='h5' component='h2'>
                {employee.firstName} {employee.lastName}
              </Typography>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                {employee.jobTitle}
              </Typography>
              <Typography variant='button' component='h2'>
                Area: {employee.jobArea}
              </Typography>
              <Typography variant='button' component='h2'>
                Type: {employee.jobType}
              </Typography>
              <Typography variant='button' component='h2'>
                Birthday: {new Date(employee.dateOfBirth).toDateString()}
              </Typography>
            </CardContent>
          </Card>
          <EmployeeProjectList />
        </>
      )}
    </>
  );
}
