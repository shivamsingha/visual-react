import React, { Component } from 'react';
import { Box, Button, Diagram, Heading, Grommet, Stack } from 'grommet';
import { Notification } from 'grommet-icons';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
  <Box
    align='center' 
    background='neutral-1' 
    direction='row-responsive' 
    elevation='medium' 
    justify='between' 
    tag='header'
    pad='medium'
    {...props}
  />
);

const SideBar = (props) => (
  <Box
    align='center'
    background='accent-1'
    width='medium'
    elevation='small'
    justify='center'
    {...props}
  />
);

class App extends Component {
  /*returnStack() {
    return <linkedlist/>;
  }*/

  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar>
            Texteru
            <Heading level='3' margin='none'>Heading</Heading>
            <Button icon={<Notification />} onclick='() => {}' />
          </AppBar>
          <Box direction='row' flex overflow={{horizontal:'hidden'}}>
            <Box flex align='center' justify='center'>
              body
            </Box>
            <SideBar>
              {/*this.returnStack()*/}
            </SideBar>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

class linkedlist extends Component {
  render() {
    return (
      <Stack fill>
        <Box>
          <Box direction='row'>
          </Box>
        </Box>
      </Stack>
    );
  }
}
export default App;
