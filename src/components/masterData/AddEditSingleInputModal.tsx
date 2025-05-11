import { Input, Modal } from "antd";
import { useState } from "react";
import "./AddEditSingleInputModal.css"

interface AddEditSingeInputModalProps {
  title: string;
  label: string;
  value: string;
  open: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onOk: () => void;
  onCancel: () => void;
}

const AddEditSingeInputModal: React.FC<AddEditSingeInputModalProps> = ({
  title,
  label,
  value,
  open,
  setValue,
  onOk,
  onCancel,
}) => {
  const [focused, setFocused] = useState(false);

  // Name input for all sub categories
  return (
    <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
      <div className="input-box">
        <div className="float-label-wrapper">
          <Input
            onFocus={() => setFocused(true)} // label control
            onBlur={() => setFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ height: "3rem" }}
          />

          {/* floating label and control */}
          <label className={focused || value ? "active" : ""}>{label}</label>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditSingeInputModal;
