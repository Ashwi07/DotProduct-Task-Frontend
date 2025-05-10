import { Input, Modal } from "antd";
import { useState } from "react";
import "./AddEditSingleInputModal.css";

interface AddEditSingeInputModalProps {
  title: string;
  value: string;
  amount: number;
  open: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  onOk: () => void;
  onCancel: () => void;
}

const AddEditRewardModal: React.FC<AddEditSingeInputModalProps> = ({
  title,
  value,
  amount,
  open,
  setValue,
  setAmount,
  onOk,
  onCancel,
}) => {
  const [focused, setFocused] = useState("");

  const handleNumChange = (value: string) => {
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    setAmount(num ? num : 0);
  };

  return (
    <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
      <div className="input-box">
        <div className="float-label-wrapper">
          <Input
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused("")}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ height: "3rem" }}
          />
          <label className={focused === "name" || value ? "active" : ""}>
            Reward Name
          </label>
        </div>
      </div>
      <div className="input-box-2">
        <div className="float-label-wrapper">
          <Input
            onFocus={() => setFocused("amount")}
            onBlur={() => setFocused("")}
            onChange={(e) => handleNumChange(e.target.value)}
            value={amount}
            style={{ height: "3rem", width: "100%" }}
          />
          <label className={focused === "amount" || value ? "active" : ""}>
            Reward Amount
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditRewardModal;
