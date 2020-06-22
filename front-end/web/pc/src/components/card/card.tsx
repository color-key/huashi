import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card, {CardProps} from "@material-ui/core/Card";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    animation: "$componentsCard 1s",
  },
  "@keyframes componentsCard": {
    "0%": {
      marginTop: theme.spacing(2),
      opacity: "0"
    },
    "100%": {
      marginTop: theme.spacing(0),
      opacity: "1"
    }
  },
}));

export default ({children, className, ...props}: CardProps) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, className)} {...props}>
      {children}
    </Card>
  )
}