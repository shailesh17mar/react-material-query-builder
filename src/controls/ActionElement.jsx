import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-toolbox';

const ActionElement = (props) => {
  const {label, className, handleOnClick} = props;

  return (
    <Button label={label} className={className} onClick={e=>handleOnClick(e)}>
    </Button>
  );
}

ActionElement.displayName = 'ActionElement';

ActionElement.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  handleOnClick: PropTypes.func
};

export default ActionElement;
