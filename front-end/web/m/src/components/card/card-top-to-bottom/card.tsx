import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '../card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      // maxWidth: 345,
      marginBottom: theme.spacing(2),
    },
    header: {
      padding: theme.spacing(3, 4, 1, 4),
      '& .MuiCardHeader-title': {
        fontSize: '1rem',
        fontWeight: 'bold'
      },
      '& .MuiCardHeader-subheader': {
        fontSize: '0.75rem',
        marginTop: theme.spacing(1)
      }
    },
    content: {
      padding: theme.spacing(3, 4, 4, 4),
    },
  })
);

interface Props{
  title?: React.ReactNode
  subheader?: React.ReactNode
  children: React.ReactNode,
  onClick?: Function,
  className?: string,
  contentClass?: string,
}

const ContentWapper = ({onClick, children}: any) => onClick ? <CardActionArea onClick={onClick}>{children}</CardActionArea> : children;

export default ({className, contentClass, title, subheader, children, onClick}: Props) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, className)}>
      {title && <CardHeader className={classes.header} title={title} subheader={subheader}/>}
      <ContentWapper onClick={onClick}>
        <CardContent className={clsx(classes.content, contentClass)}>
          {children}
        </CardContent>
      </ContentWapper>
    </Card>
  );
};