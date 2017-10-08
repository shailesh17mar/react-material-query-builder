import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-toolbox';

const ValueSelector = (props) => {
  const {value, options, className, handleOnChange} = props;
  handleOnChange(value);

  return (
    <Dropdown 
      className={className}
      value={value }
      source = {
        options.map(option => {
          return {
            label: option.label,
            value: option.name
          };
        })
      }
      onChange={handleOnChange}
    />
  );
}

ValueSelector.displayName = 'ValueSelector';

ValueSelector.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  handleOnChange: PropTypes.func
};

export default ValueSelector;
