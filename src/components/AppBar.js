import React from "react";
import { Box } from "grommet";

const AppBar = (props) => (
  <Box
    align="center"
    background="neutral-1"
    direction="row-responsive"
    elevation="medium"
    justify="between"
    as="header"
    pad="medium"
    {...props}
  />
);

export default AppBar;