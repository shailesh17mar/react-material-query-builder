import React from 'react';

export default class Rule extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showKeyValueEditor: false
    };
  }

	static get defaultProps() {
		return {
			id: null,
			parentId: null,
			keyName: null,
			keyLabel: null,
			fieldLabel: null,
			field: null,
      label: null,
			operator: null,
			value: null,
			schema: null
		};
	}

	render() {
		const {field, showJoin, keyName, keyLabel, fieldLabel, operator, value, schema: {fields, controls, getOperators, getLevel, classNames}} = this.props;
		var level = getLevel(this.props.id);
    const showKeyValueEditor = this.state.showKeyValueEditor;
		return (
			<div className={`rule ${classNames.rule}`}>
				{
					React.createElement(controls.fieldSelector,
						{
							options: fields,
							value: field,
							className: `rule-fields ${classNames.fields}`,
							handleOnChange: this.onFieldChanged, 
							level: level
						}
					)
        }
        {showKeyValueEditor?
					React.createElement(controls.valueEditor,
						{
							field: field,
							operator: operator,
							value: keyName,
              label: keyLabel,
							className: `rule-value ${classNames.value}`,
							handleOnChange: this.onKeyChanged, 
							level: level
						}
					)
				: null}
				{
					React.createElement(controls.operatorSelector,
						{
							field: field,
							options: getOperators(field),
							value: operator,
							className: `rule-operators ${classNames.operators}`,
							handleOnChange: this.onOperatorChanged, 
							level: level
						}
					)
				}
				{
					React.createElement(controls.valueEditor,
						{
							field: field,
							operator: operator,
							value: value,
              label: fieldLabel,
							className: `rule-value ${classNames.value}`,
							handleOnChange: this.onValueChanged, 
							level: level
						}
					)
				}
				{
					React.createElement(controls.removeRuleAction,
						{
							label: 'x',
							isIcon: true,
							className: `rule-remove ${classNames.removeRule}`,
							handleOnClick: this.removeRule, 
							level: level
						})
				}
				{showJoin?
						<span className="filter-and">AND</span>
						: null
				}
			</div>
		);
	}

	onFieldChanged = (value) => {
    //check if it has haskey attribute if yes then show the keyvalue editor
    const field = this.props.schema.fields.filter( field =>  field.name === value)[0];
    if(field.hasKey){
      this.setState({ showKeyValueEditor : true})
    }
    else{
      this.setState({ showKeyValueEditor : false})
    }
    this.onElementChanged('field', value);
  }

  onOperatorChanged = (value) => {
    this.onElementChanged('operator', value);
  }

  onValueChanged = (value) => {
    this.onElementChanged('value', value);
  }

  onKeyChanged = (value) => {
    this.onElementChanged('keyName', value);
  }

  onElementChanged = (property, value) => {
    const {id, schema: {onPropChange}} = this.props;

    onPropChange(property, value, id);
  }

  removeRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
  }

}
