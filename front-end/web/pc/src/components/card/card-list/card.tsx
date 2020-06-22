import React from 'react';
import Card from '../card-left-to-right'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: `0 ${theme.spacing(2)+2}px`,
    marginBottom: 0,
  },
  headerCell: {
    fontSize: '0.75rem'
  },
  cell: {
    fontSize: '0.875rem'
  },
  operate: {
    display: 'flex',
    position: 'absolute',
    width: 'calc(100% - 80px)',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1.25),
  },
  operateButtons: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: theme.spacing(1),
  }
}));

interface Props {
  headers: any[],
  showHeader?: boolean,
  className?: string,
  dataSource: any[],
  operate?: React.FunctionComponent<any>
}

export default ({headers, showHeader=true, dataSource, operate, className}: Props) => {
  const classes = useStyles();
  const operateRef = React.createRef<HTMLDivElement>();

  return (
    <div className={className}>
      {
        showHeader &&
        <Grid container justify="space-between" spacing={2} className={classes.header}>
          {
            headers.map((h: any) => {
              return <Grid item xs={h.xs} key={h.key}><Typography color={"textSecondary"} className={classes.headerCell}>{h.name}</Typography></Grid>;
            })
          }
        </Grid>
      }
      {
        dataSource.map((d: any, i: number) => {
          return (
            <Card key={d.id || i} onClick={d.onClick}>
              <Grid container justify="space-between" spacing={2}>
                {
                  headers.map((h: any) => {
                    return (
                      <Grid item xs={h.xs} key={h.key}>
                        {
                          h.renderer ?
                          h.renderer(d[h.key], d)
                          :
                          <Typography color={h.color} noWrap className={classes.cell}>{d[h.key]}</Typography>
                        }
                      </Grid>
                    )
                  })
                }
              </Grid>
              <div className={classes.operate} ref={operateRef}>
                <div className={classes.operateButtons}>
                  {operate && operate(d)}
                </div>
              </div>
            </Card>
          )
        })
      }
    </div>
  )
}