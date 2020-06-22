import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '../card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2),
      border: '1px solid rgba(224,224,224,1)'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      minHeight: '56px',
      padding: theme.spacing(2),
      '&.MuiCardContent-root:last-child': {
        paddingBottom: theme.spacing(2),
      }
    },
  })
);

interface Props {
  children: React.ReactNode,
  onClick?: (event: any) => void,
  className?: string,
  contentClass?: string;
  justify?: 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly',
}

const WrapperComponent = ({children, onClick}: any) => onClick?<CardActionArea onClick={onClick}>{children}</CardActionArea> : children;

export default ({children, justify='flex-start', className, contentClass, onClick, ...props}: Props) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, className)} {...props}>
      <WrapperComponent onClick={onClick}>
        <CardContent className={clsx(classes.content, contentClass)} style={{justifyContent: justify}}>
          {children}
        </CardContent>
      </WrapperComponent>
    </Card>
  );
}