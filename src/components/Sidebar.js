import React, { Component } from 'react';
import SidebarContainer from './SidebarContainer';
import SidebarContent from './SidebarContent';
import {
  Box,
  Button,
  Layer,
  Collapsible,
} from 'grommet';
import { Next, Previous, FormClose } from 'grommet-icons';

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

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { showSidebar: (this.props.ViewportSize === 'small') ? false : true };
  }
  render() {
    const { showSidebar } = this.state;
    const { ViewportSize } = this.props;
    return (
      <Box direction='row-responsive' flex>
        {
          (!showSidebar || ViewportSize !== 'small')
            ? (
              <Collapsible direction='horizontal' open={showSidebar}>
                <SidebarContainer flex margin='none'>
                  <SidebarContent ViewportSize={ViewportSize} />
                </SidebarContainer>
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
                    onClick={this.onCloseSideBar}
                  />
                </Box>
                <SidebarContainer fill='horizontal' >
                  <SidebarContent ViewportSize={ViewportSize} />
                </SidebarContainer>
              </Layer>
            )
        }
        {(ViewportSize !== 'small') && (
          <Box background='dark-3' pad='none' >
            <SideBarButton icon={(showSidebar) ? (<Previous />) : (<Next />)}
              onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
            />
          </Box>
        )}
      </Box>
    )
  }
}