import React, { Component } from 'react';
import {
  Box,
  Button,
  Layer,
  Heading,
  Grommet,
  ResponsiveContext,
  Collapsible,
  Drop
} from 'grommet';
import { Next, Previous, FormClose, HostMaintenance, Launch, Trash, Upload, Download } from 'grommet-icons';
import { NumberInput } from 'grommet-controls';
import { connect } from "react-redux";
import { sidebarToggle, sidebarClose } from "./redux/actions";

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
    as='header'
    pad='medium'
    {...props}
  />
);

const SideBar = (props) => (
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
const SideBarButton = (props) => (
  <Button
    color='light'
    size='medium'
    margin='none'
    align='center'
    alignSelf='center'
    fill
    {...props}
  />
);

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
      //showSidebar: true,
      status: false,
      createClicked: false,
      sizeval: 0
    };
  }

  _create = () => this.setState({ status: true, createClicked: false });
  _remove = () => this.setState({ status: false, createClicked: false, sizeval: 0 });
  _createSmall = () => this.setState({ status: true, createClicked: false, showSidebar: false });
  _removeSmall = () => this.setState({ status: false, createClicked: false, showSidebar: false, sizeval: 0 });
  onCreate = () => this.setState({ createClicked: true });
  onCloseDrop = () => this.setState({ createClicked: false });
  CreateButtonRef = React.createRef();

  onSizeInput = event => {
    const {
      target: { value }
    } = event;
    let newval = Number(value);
    this.setState({ sizeval: newval });
  };

  renderSideBar(size) {
    const { status, createClicked, sizeval } = this.state;
    return (
      <Box fill='horiontal' pad='large'>
        <Button margin={{ vertical: 'small' }}
          icon={(status) ? <Trash /> : <Launch />} label={(status) ? 'Remove' : 'Create'}
          onClick={(status) ? (null) : this.onCreate} ref={this.CreateButtonRef} primary
        />
        {(createClicked) && //(!status) &&
          <Drop target={this.CreateButtonRef.current}
            onClickOutside={this.onCloseDrop}
            onEsc={this.onCloseDrop}
          >
            <Box direction={(size === 'small') ? 'column' : 'row'} align='center' pad='small' fill>
              <Box flex
                margin={(size === 'small') ? { vertical: 'medium' } : { horizontal: 'medium' }}
              >
                <NumberInput id="size" placeholder="Enter size of stack"
                  value={sizeval} min={0}
                  onChange={this.onSizeInput}
                />
              </Box>
              <Box
                flex='shrink'
                margin={(size === 'small') ? { vertical: 'medium' } : { horizontal: 'medium' }}
                fill={(size === 'small') ? 'horizontal' : false}
              >
                <Button label='Create'
                  onClick={(status) ? (
                    (size === 'small') ? this._removeSmall : this._remove)
                    : (size === 'small') ? this._createSmall : this._create}
                />
              </Box>
            </Box>
          </Drop>
        }
        <Button label='Push' icon={<Download />} margin={{ vertical: 'small' }} />
        <Button label='Pop' icon={<Upload />} margin={{ vertical: 'small' }} />
      </Box>
    );
  }

  render() {
    const { status, sizeval } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                Texteru
                <Heading level='3' margin='none'>Heading</Heading>
              </AppBar>
              {(size === 'small') &&
                <Box
                  background='dark-3'
                  pad='none'
                  margin='none'
                >
                  <SideBarButton icon={<HostMaintenance />} onClick={this.props.sidebarToggle} />
                </Box>
              }
              <Box direction='row-responsive' flex overflow={{ horizontal: 'hidden' }}>
                {(!this.props.showSidebar || size !== 'small') ? (
                  <Collapsible direction='horizontal' open={this.props.showSidebar}>
                    <SideBar flex margin='none'>
                      {null/*this.renderSideBar(size)*/}
                    </SideBar>
                  </Collapsible>
                ) : (
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
                          onClick={this.props.sidebarClose}
                        />
                      </Box>
                      <SideBar fill='horizontal' >
                        {null/*this.renderSideBar(size)*/}
                      </SideBar>
                    </Layer>
                  )}
                {(size !== 'small') && (
                  <Box background='dark-3' pad='none' >
                    <SideBarButton icon={(this.props.showSidebar) ? (<Previous />) : (<Next />)}
                      onClick={this.props.sidebarToggle}
                    />
                  </Box>
                )}
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

function mapStateToProps(state) {
  const { showSidebar, status, createClicked, sizeval } = state;
  return { showSidebar, status, createClicked, sizeval };
}

export default connect(mapStateToProps, { sidebarToggle, sidebarClose })(App);