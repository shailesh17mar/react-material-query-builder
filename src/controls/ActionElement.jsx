import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'react-toolbox';

const ActionElement = (props) => {
  const {label, isIcon, className, handleOnClick} = props;

    return isIcon?
    <IconButton icon='close' className={className} onClick={e=>handleOnClick(e)} ></IconButton>
    : <Button raised label={label} className={className} onClick={e=>handleOnClick(e)}></Button>;
}

ActionElement.displayName = 'ActionElement';

ActionElement.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  handleOnClick: PropTypes.func
};

export default ActionElement;
