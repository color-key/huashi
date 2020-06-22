import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Desc from './desc';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
  className: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box p={3}>
        {children}
      </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  tab: {
    width: 700,
    padding: theme.spacing(0, 12.5)
  },
  view: {
    backgroundColor: theme.palette.background.default,
  },
  viewItem: {
    padding: theme.spacing(0, 14)
  },
  tabLabel: {
    fontWeight: 500
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
  <div className={classes.root}>
    {/*<AppBar position="static" color="default">*/}
      <Tabs
      value={value}
      className={classes.tab}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      aria-label="full width tabs example"
      >
        {/* <Tab label={<Typography variant={"h5"} className={classes.tabLabel}>产品特色</Typography>} {...a11yProps(0)} /> */}
        <Tab label={<Typography variant={"h5"} className={classes.tabLabel}>合约详情</Typography>} {...a11yProps(1)} />
        {/* <Tab label={<Typography variant={"h5"} className={classes.tabLabel}>常见问题</Typography>} {...a11yProps(2)} /> */}
      </Tabs>
    {/*</AppBar>*/}
    <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={value}
    className={classes.view}
    onChangeIndex={handleChangeIndex}
    >
      {/* <TabPanel value={value} index={0} dir={theme.direction} className={classes.viewItem}>
        Item One
      </TabPanel> */}
      <TabPanel value={value} index={0} dir={theme.direction} className={classes.viewItem}>
        <Desc/>
      </TabPanel>
      {/* <TabPanel value={value} index={2} dir={theme.direction} className={classes.viewItem}>
        Item Three
      </TabPanel> */}
    </SwipeableViews>
  </div>
  );
}
