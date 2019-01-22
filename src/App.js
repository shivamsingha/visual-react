import React, { Component } from 'react';
import { 
  Box, 
  Button, 
  Diagram, 
  Layer,
  Heading, 
  Grommet, 
  ResponsiveContext,
  Collapsible,
  Stack 
} from 'grommet';
import { Notification, FormClose } from 'grommet-icons';

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
    justify='center'
    {...props}
  />
);

class closeButton extends Component {
  renderx() {
    return(
      <Box>b</Box>
    );
  }
}

class App extends Component {
  state = {
    showSidebar: true,
  }

  /*returnStack() {
    return <linkedlist/>;
  }*/

  render() {
    const {showSidebar}=this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size =>(
            <Box fill>
              <AppBar>
                Texteru
                <Heading level='3' margin='none'>Heading</Heading>
                <Button icon={<Notification />} onClick={() => this.setState({showSidebar: !this.state.showSidebar})} />
              </AppBar>
              <Box direction='row' flex overflow={{horizontal:'hidden'}}>
                <Box flex align='center' justify='center'>
                  body
                </Box>
                {(!showSidebar || size !== 'small') 
                  ?(
                    <Collapsible direction='horizontal' open={showSidebar}>
                        <SideBar flex>
                          jcutjc
                        </SideBar>
                    </Collapsible>
                  ) 
                  :(
                    <Layer>
                      <Box
                        background='light-2'
                        tag='header'
                        justify='end'
                        align='center'
                        direction='row'
                      >
                        <Button
                          icon={<FormClose />}
                          onClick={() => this.setState({ showSidebar: false })}
                        />
                      </Box>
                      <SideBar fill>
                        jasfasd
                      </SideBar>
                    </Layer>
                  )
                }
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
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
