import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Clear from '@material-ui/icons/Clear';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => 
    createStyles({
        root: {
            height: 56,
            backgroundColor: '#FFEAED',
            borderRadius: theme.spacing(0.5),
            border: '1px solid #F29495',
            padding: theme.spacing(0, 1),
            fontSize: '0.875rem',
            color: '#D70D26',
            display: 'flex',
            alignItems: 'center'
        },
        desContent: {
            display: 'flex',
            width: 'calc(100% - 20px)',
            textOverflow: 'ellipsis'
        },
        des: {
            marginLeft: theme.spacing(1.25)
        },
        pointer: {
            cursor: 'pointer'
        },
        show: {
            display: 'none'
        }
    })
)

export default ({des= '', callback, style}: any) => {
    const classes = useStyles({});
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {
        setShow(des === '');
    }, [des])
    return (
        <div className={clsx(classes.root, style, show ? classes.show : null)}>
            <div className={classes.desContent}>
                <CancelIcon fontSize='small'/>
                <div className={classes.des}>{des}</div>
            </div>
            <Clear fontSize='small' onClick={callback} className={classes.pointer}/>
        </div>
    )
}