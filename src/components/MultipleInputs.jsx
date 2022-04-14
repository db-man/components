import React from "react";
import { Input } from "antd";

const str2arr = (str) => str.split("\n");
const arr2str = (arr) => arr.join("\n");

export default class MultipleInputs extends React.Component {
  handleChange = (event) => {
    this.props.onChange(str2arr(event.target.value));
  };
  render() {
    return (
      <Input.TextArea
        rows={3}
        {...this.props}
        value={arr2str(this.props.value)}
        onChange={this.handleChange}
      />
    );
  }
}

MultipleInputs.defaultProps = {
  value: [],
};
