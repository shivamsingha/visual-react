import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppBar, Sidebar
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

const NodeBox = ({ id, data, exist, ...props }) => (
  <Box
    border={{ style: 'dashed', size: 'small' }}
    background='accent-2'
    flex='grow'
    {...props}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      createClicked: false,
      sizeval: 0
    }
  }

  render() {
    const { status, sizeval } = this.state;
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
              <Box direction='row-responsive' flex overflow={{ horizontal: 'hidden' }}>
                <Sidebar ViewportSize={ViewportSize} />
                <Box flex align='center' justify='center' margin={{ horizontal: 'medium', vertical: 'none' }} pad='medium'>
                  {status &&
                    <Box pad={{ horizontal: 'xlarge', vertical: 'none' }} fill>
                      {(sizeval) && ([...Array(sizeval).keys()].map(id => (
                        <NodeBox id={id} key={id}>
                          <h3>{id}</h3>
                        </NodeBox>
                      )))}
                    </Box>
                  }
                </Box>
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(App);