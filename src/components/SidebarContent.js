import React, { Component } from "react";
import { connect } from "react-redux";
import { create, remove, npush, npop } from "../redux/actions";
import {
  Box,
  Button,
  Drop,
  TextInput
} from "grommet";
import {
  Launch,
  Trash,
  Upload,
  Download,
} from "grommet-icons";
import { NumberInput } from "grommet-controls";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCreateDrop: false,
      displayPushDrop: false,
      sizeval: "",
      pushval: ""
    };
    this.CreateButtonRef = React.createRef();
    this.PushButtonRef = React.createRef();
  }

  handleCreate = () => {
    this.props.create(this.state.sizeval);
    this.setState({ displayCreateDrop: false });
    if (this.props.ViewportSize === "small")
      this.props.handleSidebar();
  }

  handleRemove = () => {
    this.props.remove();
    if (this.props.ViewportSize === "small")
      this.props.handleSidebar();
  }

  handlePush = () => {
    this.props.npush(this.state.pushval);
    this.setState({ displayPushDrop: false });
    if (this.props.ViewportSize === "small")
      this.props.handleSidebar();
  }
  
  handlePop = () => {
    this.props.npop();
    if (this.props.ViewportSize === "small")
      this.props.handleSidebar();
  }

  handleAutoFocus = (e) => e.target.select();
  showCreateDrop = () => this.setState({ displayCreateDrop: true });
  closeCreateDrop = () => this.setState({ displayCreateDrop: false });
  showPushDrop = () => this.setState({ displayPushDrop: true });
  closePushDrop = () => this.setState({ displayPushDrop: false });
  onPushInput = e => this.setState({ pushval: e.target.value });
  onSizeInput = e => this.setState({ sizeval: Number(e.target.value) });

  /*onSizeInput = event => {
    const {
      target: { value }
    } = event;
    let newval = Number(value);
    this.setState({ sizeval: newval });
  };*/

  render() {
    const { Status, ViewportSize } = this.props;
    const { displayCreateDrop, displayPushDrop, sizeval, pushval } = this.state;
    return (
      <Box fill pad="large">
        <Button
          margin={{ vertical: "small" }}
          icon={(Status) ? <Trash /> : <Launch />}
          label={(Status) ? "Remove" : "Create"}
          onClick={(Status) ? this.handleRemove : this.showCreateDrop}
          ref={this.CreateButtonRef}
          primary
        />
        {(displayCreateDrop) &&
          <Drop
            target={this.CreateButtonRef.current}
            onClickOutside={this.closeCreateDrop}
            onEsc={this.closeCreateDrop}
          >
            <Box
              direction={(ViewportSize === "small") ? "column" : "row"}
              align="center"
              pad="small"
              fill
            >
              <Box
                flex
                margin={(ViewportSize === "small") ? { vertical: "medium" } : { horizontal: "medium" }}
              >
                <NumberInput
                  id="size"
                  placeholder="Enter size of stack"
                  value={sizeval} 
                  min={1}
                  onChange={this.onSizeInput}
                  onFocus={this.handleAutoFocus}
                />
              </Box>
              <Box
                flex="shrink"
                margin={(ViewportSize === "small") ? { vertical: "medium" } : { horizontal: "medium" }}
                fill={(ViewportSize === "small") ? "horizontal" : false}
              >
                <Button
                  label="Create"
                  onClick={this.handleCreate}
                />
              </Box>
            </Box>
          </Drop>
        }
        <Button
          label="Push"
          icon={<Download />}
          margin={{ vertical: "small" }}
          disabled={!Status}
          onClick={this.showPushDrop}
          ref={this.PushButtonRef}
        />
        {(displayPushDrop) &&
          <Drop
            target={this.PushButtonRef.current}
            onClickOutside={this.closePushDrop}
            onEsc={this.closePushDrop}
          >
            <Box
              direction={(ViewportSize === "small") ? "column" : "row"}
              align="center"
              pad="small"
              fill
            >
              <Box
                flex
                margin={(ViewportSize === "small") ? { vertical: "medium" } : { horizontal: "medium" }}
              >
                <TextInput
                  id="size"
                  placeholder="Enter data to puch to the stack"
                  value={pushval}
                  onChange={this.onPushInput}
                  onFocus={this.handleAutoFocus}
                />
              </Box>
              <Box
                flex="shrink"
                margin={(ViewportSize === "small") ? { vertical: "medium" } : { horizontal: "medium" }}
                fill={(ViewportSize === "small") ? "horizontal" : false}
              >
                <Button
                  label="Push"
                  onClick={this.handlePush}
                />
              </Box>
            </Box>
          </Drop>
        }
        <Button
          label="Pop"
          icon={<Upload />}
          margin={{ vertical: "small" }}
          disabled={!Status}
          onClick={this.handlePop}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.malloc })

export default connect(
  mapStateToProps,
  { create, remove, npush, npop }
)(SidebarContent);