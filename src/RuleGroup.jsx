import React from 'react';
import Rule from './Rule';

export default class RuleGroup extends React.Component {

	static get defaultProps() {
		return {
			id: null,
			parentId: null,
			rules: [],
			combinator: 'and',
			schema: {},
		};
	}

	render() {
		const { combinator, showCombinators, rules, isRoot, allowRulesAtRoot, allowGroupsAtChildren, schema: {combinators, controls, onRuleRemove, isRuleGroup, getLevel, classNames } } = this.props;
		const level = getLevel(this.props.id);
		return (
			<div className={`ruleGroup ${classNames.ruleGroup}`}>
				{showCombinators?
					React.createElement(controls.combinatorSelector,
						{
							options: combinators,
							value: combinator,
							className: `ruleGroup-combinators ${classNames.combinators}`,
							handleOnChange: this.onCombinatorChange, 
							rules: rules, 
							level: level
						}
					)
				:null }
				{(!isRoot || allowRulesAtRoot)?
						React.createElement(controls.addRuleAction,
							{
								label: 'Add Rule',
								className: `ruleGroup-addRule ${classNames.addRule}`,
								handleOnClick: this.addRule, 
								rules: rules, 
								level: level
							}
						)
						: null}
						{(isRoot || allowGroupsAtChildren)?
							React.createElement(controls.addGroupAction,
								{
									label: 'Add Group',
									className: `ruleGroup-addGroup ${classNames.addGroup}`,
									handleOnClick: this.addGroup, 
									rules: rules, 
									level: level
								}
							)
						: null}
						{
							this.hasParentGroup() ?
								React.createElement(controls.removeGroupAction,
									{
										isIcon: true,
										className: `ruleGroup-remove ${classNames.removeGroup}`,
										handleOnClick: this.removeGroup, 
										rules: rules, 
										level: level
									}
								) : null
						}
						{
							rules.map((r, i) => {
								return (
									isRuleGroup(r)
									? <RuleGroup key={r.id}
										id={r.id}
										schema={this.props.schema}
										parentId={this.props.id}
										allowGroupsAtChildren={allowGroupsAtChildren}
										combinator={r.combinator}
										rules={r.rules}/>
									: <Rule key={r.id}
										id={r.id}
										field={r.field}
										value={r.value}
										keyName={r.keyName}
										operator={r.operator}
										showJoin={i !== rules.length -1}
										schema={this.props.schema}
										parentId={this.props.id}
										onRuleRemove={onRuleRemove}/>
								);
							})
						}
					</div>
		);
	}

	hasParentGroup() {
		return this.props.parentId;
	}

	onCombinatorChange = (value) => {
		const {onPropChange} = this.props.schema;

		onPropChange('combinator', value, this.props.id);
	}

	addRule = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const {createRule, onRuleAdd} = this.props.schema;

		const newRule = createRule();
		onRuleAdd(newRule, this.props.id)
	}

	addGroup = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const {createRuleGroup, onGroupAdd} = this.props.schema;
		const newGroup = createRuleGroup();
		onGroupAdd(newGroup, this.props.id)
	}

	removeGroup = (event) => {
		event.preventDefault();
		event.stopPropagation();

		this.props.schema.onGroupRemove(this.props.id, this.props.parentId);
	}

}
