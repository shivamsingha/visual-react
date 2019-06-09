import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  InfiniteScroll
} from 'grommet';

const NodeBox = (props) => {
  const borderStyle = (props.data === '') ? { style: 'dashed' } : { style: 'solid' }
  return (
    <Box
      border={{ ...borderStyle, size: 'small' }}
      background='light-2'
      margin={{ horizontal: 'large', top: 'xsmall' }}
      flex='grow'
      {...props}
    >
      {props.id}  {props.data}
    </Box>
  );
}
const ImmutableReverse = (arr) => [...arr].reverse();

class MainContent extends Component {
  render() {
    const { Status, Memory } = this.props;
    return (
      <Box
        flex
        align='center'
        justify='center'
      >
        {console.log(Memory)}
        {console.log(ImmutableReverse(Memory))}
        {Status &&
          <Box
            overflow='auto'
            fill>
            <InfiniteScroll items={ImmutableReverse(Memory)} >
              {(item) =>
                <NodeBox id={item.id} key={item.id} data={item.data} />
              }
            </InfiniteScroll>
            {/*ImmutableReverse(Memory).map((x) =>
              <NodeBox id={x.id} key={x.id} data={x.data} >
                <h6>{x.id}</h6>
                <h3>{x.data}</h3>
              </NodeBox>
            )*/}
          </Box>
        }

      </Box>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.malloc });

export default connect(mapStateToProps)(MainContent);