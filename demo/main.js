import QueryBuilder from '../src/index';
import ReactDOM from "react-dom";
import React from 'react';
import { Input } from 'react-toolbox';

const fields = [
  {name: 'firstName', label: 'First Name', fieldLabel: 'sharma'},
  {name: 'lastName', label: 'Last Name'},
  {name: 'age', label: 'Age'},
  {name: 'address', label: 'Address'},
  {name: 'phone', label: 'Phone'},
  {name: 'email', label: 'Email', hasKey: true},
  {name: 'twitter', label: 'Twitter'},
  {name: 'isDev', label: 'Is a Developer?', hasKey: true},
];

class RootView extends React.Component {

  constructor() {
    super();
    this.state = {
      query: {}
    };
  }

  render() {
    let controlElements = {
      valueEditor: this.customValueEditor()
    }
    return (
      <div className="flex-box">
        <div className="scroll">
          <QueryBuilder
            fields={this.props.fields}
            controlClassnames={{fields: 'form-control'}}
            onQueryChange={this.logQuery.bind(this)}/>
        </div>
        <div className="shrink query-log scroll">
          <h4>Query</h4>
          <pre>{JSON.stringify(this.state.query, null, 2)}</pre>
        </div>
      </div>
    );
  }

  customValueEditor() {
    let checkbox = class MyCheckbox extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        if (this.props.field !== 'isDev' || this.props.operator !== '=') {
          return <Input type="text"
            value={this.props.value}
            onChange={e => this.props.handleOnChange(e.target.value)}/>
        }

        return (
          <span>
            <input type="checkbox"
              value={!!this.props.value}
              onChange={e => this.props.handleOnChange(e.target.checked)}/>
          </span>
        );
      }
    };
    return checkbox;
  }

  logQuery(query) {
    this.setState({query});
  }

}

ReactDOM.render(<RootView fields={fields} />, document.querySelector('.container'));

