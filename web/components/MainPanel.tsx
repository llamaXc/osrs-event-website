import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Inventory} from "./Inventory"
import {Level} from "./Level"
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className="iconTabs" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className="iconTab" icon={<img src="/icons/inventory.png" />}/>
          <Tab className="iconTab" icon={<img src="/icons/level.png" />}/>
          <Tab className="iconTab" icon={<img src="/icons/equipment.png" />}/>
        </Tabs>

        <TabPanel value={value} index={0}>
            <Inventory/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Level/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            Empty
        </TabPanel>
      </Box>
  );
}