import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useRouter} from 'next/router'
import {PATH_PREFIX} from '@/env';

interface StyledTabsProps {
  value: any;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles((theme: Theme) => ({
  root: {
    height: "100%",
    marginLeft: theme.spacing(4)
  },
  flexContainer: {
    height: "100%"
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 100,
      textTransform: 'none',
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      opacity: 1,
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const data = [{
  label: '首页',
  path: PATH_PREFIX === '' ? '/' : PATH_PREFIX
},{
  label: '云算力',
  path: PATH_PREFIX + '/ccp'
},{
  label: '帮助中心',
  path: PATH_PREFIX + '/help'
}]

export default () => {
  const router = useRouter();
  let value = data.findIndex((item) => item.path === router.pathname);
  if (value === -1) value = 0;
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    router.push(data[newValue].path);
  };

  return (
    <StyledTabs value={value>-1 && value} onChange={handleChange} aria-label="navigation">
      {
        data.map((item, i) => <StyledTab key={i} label={item.label} />)
      }
    </StyledTabs>
  );
}
