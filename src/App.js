import React, { Component } from 'react';
import {
  AppBar, 
  Sidebar,
  MainContent
} from './components';
import {
  Box,
  Heading,
  Grommet,
  ResponsiveContext,
} from 'grommet';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {ViewportSize => (
            <Box fill>
              <AppBar>
                Texteru
                <Heading level='3' margin='none'>Heading</Heading>
              </AppBar>
              {(ViewportSize === 'small') &&
                <Box
                  background='dark-3'
                  pad='none'
                  margin='none'
                >
                  {/*<SideBarButton icon={<HostMaintenance />} onClick={() => this.setState({ showSidebar: !this.state.showSidebar })} />*/}
                </Box>
              }
              <Box
                direction='row-responsive'
                flex
                overflow={{ horizontal: 'hidden' }}
              >
                <Sidebar ViewportSize={ViewportSize} />
                <MainContent />
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;

//const mapStateToProps = (state) => ({ ...state })

//export default connect(mapStateToProps)(App);