import React from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    width: '100%',
    height: theme.spacing(6),
    borderRadius: 4,
    border: `1px solid ${grey[300]}`
  },
  select: {
    color: '#263BE0',
    fontWeight: 500,
  },
  default: {
    backgroundColor: 'white',
    fontWeight: 400,
  },
}))

const StyledTabs = withStyles(() => 
  createStyles({
    root: {
      height: 48,
      minHeight: 0,
    },
    indicator: {
      backgroundColor: '#263BE0'
    },
  }),
)(Tabs);

const StyledTab = withStyles(() =>
  createStyles({
    root: {
      height: 48,
      minHeight: 48,
      backgroundColor: '#FFFFFF',
      color: '#888888'
    },
    selected: {
      color: '#263BE0'
    },
  }),
)(Tab);

export const TabSwitch = {
  MOBILE: 0,
  EMAIL: 1,
}

export default ({
  defaultValue=TabSwitch.MOBILE,
  onChange,
  titleMobile='手机',
  titleEmail='邮箱'
}: any) => {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setValue(defaultValue);
  },[defaultValue])

  const handleChange = (_e: any, val: any) => {
    setValue(val);
    onChange && onChange(val);
  }
  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      className={classes.tab}
    >
      <StyledTab label={titleMobile} className={value === TabSwitch.MOBILE ? classes.select : classes.default} />
      <StyledTab label={titleEmail} className={value === TabSwitch.EMAIL ? classes.select : classes.default}/>
    </StyledTabs>
  )
}