import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-toolbox';

const ValueEditor = (props) => {
  const {field, operator, value, handleOnChange} = props;

  if (operator === 'null' || operator === 'notNull'  || operator === 'exists' || operator === 'notExists') {
    return null;
  }

  return (
    <Input
      value={value || ''}
      onChange={e=>handleOnChange(e.target.value)} 
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
