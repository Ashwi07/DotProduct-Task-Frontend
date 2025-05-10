import { Form, Input } from "antd";
import React, { useState } from "react";

interface FloatingLableInputProps {
  label: string;
  isPassword?: boolean;
  rules?: any[];
  name: string;
}

const FloatingLableInput: React.FC<FloatingLableInputProps> = ({
  label,
  isPassword = false,
  rules = [],
  name,
}) => {
  const [focused, setFocused] = useState(false);
  const form = Form.useFormInstance();
  const value = Form.useWatch(name, form);

  return (
    <Form.Item name={name} rules={rules} className="form-item-float">
      <div className="float-label-wrapper">
        {isPassword ? (
          <Input.Password
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={value}
            style={{ height: "3rem" }}
          />
        ) : (
          <Input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={value}
            style={{ height: "3rem" }}
          />
        )}
        <label className={focused || value ? "active" : ""}>{label}</label>
      </div>
    </Form.Item>
  );
};

export default FloatingLableInput;
