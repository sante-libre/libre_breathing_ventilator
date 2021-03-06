import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Title from './Title';

const useStyles = makeStyles((theme) => ({
  title: {
  },
  value: {
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
  },
  unit: {
    textAlign: 'center',
  },
}));

export default function DataCard({
  title,
  value,
  unit,
  textColor
}) {
  const classes = useStyles();
  return (
    <Fragment>
      <Title className={classes.title}>{title}</Title>
      <Typography component="p" variant="h1" className={classes.value} style={{color: textColor}}>
        {value}
      </Typography>
      <Typography color="textSecondary" variant="h4" className={classes.unit} >
        {unit}
      </Typography>
    </Fragment>
  );
}
