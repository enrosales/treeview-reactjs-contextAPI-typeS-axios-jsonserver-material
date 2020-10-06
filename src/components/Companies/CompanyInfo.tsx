import React, { useEffect } from 'react';
//Material
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//context
import { useGlobalContext } from '../../context/GlobalState';
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

export default function CompanyInfo() {
  const classes = useStyles();
  const { address, nodeSelected, setCompanyAddress } = useGlobalContext();

  useEffect(() => {
    const loadAddress = async () => {
      setCompanyAddress(nodeSelected.companyId);
    };
    loadAddress();
  }, [nodeSelected]);

  return (
    <>
      {address && address.length > 0 && (
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Typography variant='h5' component='h2'>
              Country: {address[0].country}
            </Typography>
            <Typography color='textSecondary'>
              City: {address[0].city}
            </Typography>
            <Typography color='textSecondary'>
              State: {address[0].state}
            </Typography>
            <Typography color='textSecondary'>
              Street: {address[0].street}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
