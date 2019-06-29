import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  InfiniteScroll,
  Stack,
  Text
} from "grommet";

const NodeBox = (props) => {
  const borderStyle = (props.data === "") ? { style: "dashed" } : { style: "solid" };
  return (
    <Box
      border={{ ...borderStyle, size: "small" }}
      background={(props.data === "") ? "none" : `light-${(props.id % 2) * 2 + 2}`}
      margin={{ horizontal: "xsmall", top: "xsmall" }}
      height="xsmall"
      flex="grow"
      {...props}
    >
      <Text>{props.data}</Text>
    </Box>
  );
};
const immutableReverse = (arr) => [...arr].reverse();

class MainContent extends Component {
  render() {
    const { Status, Memory } = this.props;
    return (
      <Box
        flex={{grow:3}}
        align="center"
        justify="center"
      >
        {Status &&
          <Box
            overflow="auto"
            fill>
            <InfiniteScroll items={immutableReverse(Memory)} >
              {(item) =>
                <Stack anchor="left" key={item.id}>
                  <NodeBox id={item.id} key={item.id} data={item.data} />
                  <Box background="brand" round pad="xsmall">
                    <Text>
                      {item.id}
                    </Text>
                  </Box>
                </Stack>
              }
            </InfiniteScroll>
            {/*immutableReverse(Memory).map((x) =>
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