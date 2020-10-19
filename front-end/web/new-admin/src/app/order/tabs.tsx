import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Table from './table';
import { SearchStateType } from '.';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

interface Props{
  search: SearchStateType
  userId?: string
}

export default ({search, userId}: Props) => {
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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="全部订单" />
          <Tab label="待审核订单" />
          <Tab label="问题订单" />
          <Tab label="已审核订单" />
          <Tab label="已发货订单" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Table search={search} userId={userId}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Table search={search} userId={userId} type={"PENDING"}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Table search={search} userId={userId} type={"REJECT"}/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Table search={search} userId={userId} type={"PASS"}/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <Table search={search} userId={userId} type={"SEND"}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
