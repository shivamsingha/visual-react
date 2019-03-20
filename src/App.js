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
  Stack,
  Drop,
  FormField,
  TextInput
} from 'grommet';
import { Next, Previous, FormClose, HostMaintenance, Launch, Trash, Upload, Download } from 'grommet-icons';

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
    fill={true}
    {...props}
  />
)

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
    status: false,
    createClicked:false
  }

  _create = () => this.setState({status: true, createClicked: false});
  onCreate = () => this.setState({createClicked: true});
  onCloseDrop = () => this.setState({createClicked: false});
  CreateButtonRef = React.createRef();

  onSizeInput = event => {
    const {
      taget: { value }
    } = event;
    //const exp = new RegExp(value, "i");
    //const suggestions = allSuggestions.filter(s => exp.test(s));
    this.setState({ value});  //, suggestions });
  };

  /*returnStack() {
    return <linkedlist/>;
  }*/

  render() {
    const {showSidebar, status, createClicked, value}=this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size =>(
            <Box fill>
              <AppBar>
                Texteru
                <Heading level='3' margin='none'>Heading</Heading>
              </AppBar>
              {(size === 'small') ?(
                <Box
                  background='dark-3'
                  pad='none'
                  margin='none'
                >
                  <SideBarButton icon={<HostMaintenance />} onClick={() => this.setState({showSidebar: !this.state.showSidebar})} />
                </Box>
                ):(null)
              }
              <Box direction='row-responsive' flex overflow={{horizontal:'hidden'}}>
                {(!showSidebar || size !== 'small') ?(
                    <Collapsible direction='horizontal' open={showSidebar}>
                      <SideBar flex margin='none'>
                        <Box fill pad='large'>
                          <Button margin={{vertical: 'small'}} 
                            icon={(status)?<Trash />:<Launch />} label={(status)?'Remove':'Create'} 
                            onClick={(status)?(null):this.onCreate} ref={this.CreateButtonRef} primary
                          />
                          {(createClicked) && //(!status) &&
                            <Drop target={this.CreateButtonRef.current}
                              onClickOutside={this.onCloseDrop}
                              onEsc={this.onCloseDrop}
                            >
                              <Box direction='row' align='center' pad='small' fill>
                                <Box flex margin={{horizontal: 'medium'}}>
                                  <FormField htmlFor="size">
                                    <TextInput id="size" placeholder="Enter size of stack" 
                                      onChange={this.onSizeInput} value={value}
                                    ></TextInput>
                                  </FormField>
                                </Box>
                                <Box flex='shrink' margin={{horizontal: 'medium'}}>
                                  <Button label='Create' onClick={this._create} />
                                </Box>
                              </Box>
                            </Drop>
                          }
                          <Button label='Push' icon={<Download />} margin={{vertical: 'small'}} />
                          <Button label='Pop' icon={<Upload />} margin={{vertical: 'small'}} />
                        </Box>
                      </SideBar>
                    </Collapsible>
                  ):(
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
                        <Box fill={true} pad='large'>
                          <Button icon={(status)?<Trash />:<Launch />} label={(status)?'Remove':'Create'} 
                            onClick={(status)?(null):this.onCreate} ref={this.CreateButtonRef} primary
                          />
                          {(createClicked) && //(!status) &&
                            <Drop target={this.CreateButtonRef.current}
                              onClickOutside={this.onCloseDrop}
                              onEsc={this.onCloseDrop}
                            >
                              <Box direction='row' align='center' pad='small' fill>
                                <Box flex margin={{horizontal: 'medium'}}>
                                  <FormField htmlFor="size">
                                    <TextInput id="size" placeholder="Enter size of stack" value={value}
                                      onChange={this.onSizeInput}
                                    ></TextInput>
                                  </FormField>
                                </Box>
                                <Box flex='shrink' margin={{horizontal: 'medium'}}>
                                <Button label='Create' onClick={this._create} />
                                </Box>
                              </Box>
                            </Drop>
                          }
                          <Button label='Push' icon={<Download />} margin={{vertical: 'small'}} />
                          <Button label='Pop' icon={<Upload />} margin={{vertical: 'small'}} />
                        </Box>
                      </SideBar>
                    </Layer>
                  )}
                  {(size !== 'small')
                    ?(
                      <Box
                        background='dark-3'
                        pad='none'
                      >
                        <SideBarButton icon={(showSidebar)?(<Previous />):(<Next />)} onClick={() => this.setState({showSidebar: !this.state.showSidebar})}
                        />
                      </Box>
                    ):(null)
                  }
                <Box flex align='center' justify='center'>
                  body
                </Box>
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
