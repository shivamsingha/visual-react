import React from 'react';
import { Box } from 'grommet';

const SidebarContainer = (props) => (
  <Box
    align='center'
    background='accent-1'
    justify='center'
    width='medium'
    flex='grow'
    responsive
    {...props}
  />
);
//width='large'

export default SidebarContainer;