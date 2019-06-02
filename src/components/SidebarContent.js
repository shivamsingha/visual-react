import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create, remove } from '../redux/actions';
import {
  Box,
  Button,
  Drop,
} from 'grommet';
import {
  Launch,
  Trash,
  Upload,
  Download,
} from 'grommet-icons';
import { NumberInput } from 'grommet-controls';

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrop: false,
      sizeval: 0,
    };
    this.CreateButtonRef = React.createRef();
  }

  handleCreate = () => {
    this.props.create(this.state.sizeval);
    this.setState({ displayDrop: false });
  }
  handleRemove = () => {
    this.props.remove();
    this.setState({ displayDrop: false });
  }
  _remove = () => this.setState({ status: false, displayDrop: false, sizeval: 0 });
  _createSmall = () => this.setState({ status: true, displayDrop: false, showSidebar: false });
  _removeSmall = () => this.setState({ status: false, displayDrop: false, showSidebar: false, sizeval: 0 });
  onCreate = () => this.setState({ displayDrop: true });
  onCloseDrop = () => this.setState({ displayDrop: false });
  onCloseSideBar = () => this.setState({ showSidebar: false });

  onSizeInput = event => {
    const {
      target: { value }
    } = event;
    let newval = Number(value);
    this.setState({ sizeval: newval });
  };

  render() {
    const { Status, ViewportSize } = this.props;
    const { displayDrop, sizeval } = this.state;
    return (
      <Box fill pad='large'>
        <Button
          margin={{ vertical: 'small' }}
          icon={(Status) ? <Trash /> : <Launch />}
          label={(Status) ? 'Remove' : 'Create'}
          onClick={(Status) ? (this.handleRemove) : this.onCreate}
          ref={this.CreateButtonRef}
          primary
        />
        {(displayDrop) && //(!Status) &&
          <Drop
            target={this.CreateButtonRef.current}
            onClickOutside={this.onCloseDrop}
            onEsc={this.onCloseDrop}
          >
            <Box
              direction={(ViewportSize === 'small') ? 'column' : 'row'}
              align='center'
              pad='small'
              fill
            >
              <Box
                flex
                margin={(ViewportSize === 'small') ? { vertical: 'medium' } : { horizontal: 'medium' }}
              >
                <NumberInput
                  id="size"
                  placeholder="Enter size of stack"
                  value={sizeval} min={0}
                  onChange={this.onSizeInput}
                />
              </Box>
              <Box
                flex='shrink'
                margin={(ViewportSize === 'small') ? { vertical: 'medium' } : { horizontal: 'medium' }}
                fill={(ViewportSize === 'small') ? 'horizontal' : false}
              >
                <Button
                  label='Create'
                  onClick={(Status) ? (
                    (ViewportSize === 'small') ? this._removeSmall : this.handleRemove)
                    : (ViewportSize === 'small') ? this._createSmall : this.handleCreate}
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
}

const mapStateToProps = (state) => ({ ...state.malloc })

export default connect(
  mapStateToProps,
  { create, remove }
)(SidebarContent);