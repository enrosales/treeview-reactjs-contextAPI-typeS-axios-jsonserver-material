import React from 'react';
//Material
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
//Components
import CompaniesTreeView from './CompaniesTreeView';
import DetailsPanel from './DetailsPanel';
//styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      backgroundColor: '#cfe8fc',
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    parent: {
      padding: 20,
    },
  })
);

export default function Layout() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Typography component='div' className={classes.parent}>
        <Grid container spacing={1}>
          <Grid item sm={4}>
            <Paper className={classes.paper}>
              <CompaniesTreeView />
            </Paper>
          </Grid>
          <Grid item sm={8}>
            <Paper className={classes.paper}>
              <DetailsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Typography>
    </main>
  );
}
