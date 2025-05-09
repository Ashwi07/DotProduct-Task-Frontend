import { Typography } from "@mui/material";
import { Modal } from "antd";

interface DeleteModalProps {
  title: string;
  description: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  description,
  open,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: "red", borderColor: "red" } }}
    >
      <Typography>{description}</Typography>
    </Modal>
  );
};

export default DeleteModal;
