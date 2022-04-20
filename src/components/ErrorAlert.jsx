import React from "react";
import { Alert, Input, Popover, Button } from "antd";

export default function ErrorAlert({ json, error, tplStr, record }) {
  return (
    <Alert
      message={
        <div>
          Failed to parse JSON generated from template, fallback to render plain
          text.
          <div>
            The generated JSON:
            <Input.TextArea defaultValue={json}></Input.TextArea>
          </div>
          <Popover
            content={
              <div style={{ width: "800px" }}>
                <div>Error: {error.message}</div>
                <div>
                  tplStr:{" "}
                  <Input.TextArea defaultValue={tplStr}></Input.TextArea>
                </div>
                <div>
                  record:{" "}
                  <Input.TextArea
                    rows={7}
                    defaultValue={JSON.stringify(record, null, 2)}
                  ></Input.TextArea>
                </div>
              </div>
            }
            title="Debug Info"
            trigger="click"
          >
            <Button danger>Debug Info</Button>
          </Popover>
        </div>
      }
      type="error"
      closable
    />
  );
}
