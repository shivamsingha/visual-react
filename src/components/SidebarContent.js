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
      sizeval: 1,
    };
    this.CreateButtonRef = React.createRef();
  }

  handleCreate = () => {
    this.props.create(this.state.sizeval);
    this.setState({ displayDrop: false });
    if (this.props.ViewportSize === 'small')
      this.props.handleSidebar();
  }

  handleRemove=()=>{
    this.props.remove();
    if (this.props.ViewportSize === 'small')
      this.props.handleSidebar();
  }

  handleFocus = (event) => event.target.select();
  showDrop = () => this.setState({ displayDrop: true });
  closeDrop = () => this.setState({ displayDrop: false });

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
          className={(Status) ? 'remove' : 'create'}
          onClick={(Status) ? this.handleRemove : this.showDrop}
          ref={this.CreateButtonRef}
          primary
        />
        {(displayDrop) && //(!Status) &&
          <Drop
            target={this.CreateButtonRef.current}
            onClickOutside={this.closeDrop}
            onEsc={this.closeDrop}
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
                  value={sizeval} min={1}
                  onChange={this.onSizeInput}
                  onFocus={this.handleFocus}
                />
              </Box>
              <Box
                flex='shrink'
                margin={(ViewportSize === 'small') ? { vertical: 'medium' } : { horizontal: 'medium' }}
                fill={(ViewportSize === 'small') ? 'horizontal' : false}
              >
                <Button
                  label='Create'
                  onClick={this.handleCreate}
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