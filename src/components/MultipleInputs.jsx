import React from "react";
import { Input } from "antd";

const str2arr = (str) => str.split("\n");
const arr2str = (arr) => arr.join("\n");

export default function MultipleInputs(props) {
  handleChange = (event) => {
    props.onChange(str2arr(event.target.value));
  };
  return (
    <Input.TextArea
      rows={3}
      {...props}
      value={arr2str(props.value)}
      onChange={handleChange}
    />
  );
}

MultipleInputs.defaultProps = {
  value: [],
};
