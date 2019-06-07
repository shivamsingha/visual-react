import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
} from 'grommet';

const NodeBox = (props) => (
  <Box
    border={{ style: 'dashed', size: 'small' }}
    background='accent-2'
    flex='grow'
    {...props}
  />
);

class MainContent extends Component {
  render() {
    const { Status, Size } = this.props;
    return (
      <Box
        flex
        align='center'
        justify='center'
        margin={{ horizontal: 'medium', vertical: 'none' }}
        pad='medium'
      >
        {Status &&
          <Box pad={{ horizontal: 'xlarge', vertical: 'none' }} fill>
            {(Size) && ([...Array(Size).keys()].map(id => (
              <NodeBox id={id} key={id}>
                <h3>{id}</h3>
              </NodeBox>
            )))}
          </Box>
        }
        
      </Box>);
  }
}

const mapStateToProps = (state) => ({ ...state.malloc });

export default connect(mapStateToProps)(MainContent);