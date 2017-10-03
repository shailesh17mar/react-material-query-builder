import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-toolbox';

const ValueEditor = (props) => {
  const {field, operator, value, handleOnChange} = props;

  if (operator === 'null' || operator === 'not_null'  || operator === 'exists' || operator === 'not_exists') {
    return null;
  }

  return (
    <Input
      required
      value={value || ''}
      onChange={handleOnChange} 
    />
  );
};

ValueEditor.displayName = 'ValueEditor';

ValueEditor.propTypes = {
  field: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.string,
  handleOnChange: PropTypes.func
};

export default ValueEditor;
