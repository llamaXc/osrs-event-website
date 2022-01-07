import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Inventory} from "./Inventory"
import {Level} from "./Level"
import { Equipment } from './Equipment'
import {Quests} from "./Quests"
import {Bank} from './Bank'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabpanel-container"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="tabpanel-box" sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export function MainPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box className="mainPanelUi" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className="iconTabs" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className="iconTab" icon={<img src="/icons/inventory.png" />}/>
          <Tab className="iconTab" icon={<img src="/icons/level.png" />}/>
          <Tab className="iconTab" icon={<img src="/icons/equipment.png" />}/>
          <Tab className="iconTab" icon={<img src="/icons/quest.png" />}/>
          <Tab className="iconTab" icon={<img src="/icons/bank.png" />}/>

        </Tabs>
          <TabPanel value={value} index={0}>
            <div className="main-wrapper">
              <Inventory/>
            </div>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="main-wrapper">
              <Level/>
            </div>

          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="main-wrapper">
              <Equipment/>
            </div>

          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="main-wrapper">
              <Quests/>
            </div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div className="main-wrapper">
              <Bank/>
            </div>
          </TabPanel>
      </Box>
  );
}