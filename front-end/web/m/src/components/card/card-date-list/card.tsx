import React from 'react';
import Typography from "@material-ui/core/Typography";
import Card from "../card-left-to-right";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
createStyles({
  date: {
    margin: theme.spacing(0.75, 0.5),
    fontSize: '0.75rem',
    color: theme.palette.grey[500]
  },
  card: {
    padding: theme.spacing(0.25, 0.75),
  },
  cardHasLast: {
    marginTop: '-19px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    animation: "$workbenchCard 1s",
  },
  "@keyframes workbenchCard": {
    "0%": {
      marginTop: '0',
      opacity: "0"
    },
    "100%": {
      marginTop: '-19px',
      opacity: "1"
    }
  },
}),
);

interface Props {
  hasLast?: boolean,
  date: string,
  children: React.ReactNode
}

export default ({hasLast=false, date, children}: Props) => {
  const classes = useStyles();

  return (
    <div>
      {
        hasLast ||
        <div className={classes.date}>
          <Typography variant={"inherit"}>{date}</Typography>
        </div>
      }
      <Card className={clsx(classes.card, {[classes.cardHasLast]: hasLast})} justify={"space-between"}>
        {children}
      </Card>
    </div>
  )
}