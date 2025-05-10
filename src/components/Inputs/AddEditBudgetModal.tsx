import { Form, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import {
  CreateBudget,
  EditBudget,
  GetBudgetCategoriesData,
} from "../../apis/inputs/budget";
import FloatingLableInput from "../login/FloatingLableInput";
import "./AddEditBudgetModal.css";
import type { IMasterExpenseItem } from "../../dtos/masterData";
import type { IBudgetItem } from "../../dtos/inputs";

interface AddEditBudgetModalProps {
  title: string;
  open: boolean;
  month: number;
  year: number;
  onCancel: () => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
  initialValues?: IBudgetItem | null;
}

const AddEditBudgetModal: React.FC<AddEditBudgetModalProps> = ({
  title,
  open,
  month,
  year,
  onCancel,
  setReload,
  reload,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<IMasterExpenseItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await GetBudgetCategoriesData(month, year);
        setCategories(response.data.data);
      } catch (err: any) {
        if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
          notification.error({
            message: "Error",
            description: err?.response?.data?.userMessage,
          });
        } else {
          notification.error({
            message: "Error",
            description: "Failed to add budget",
          });
        }
      }
    })();
  }, [reload]);

  const handleSubmitClick = () => {
    form.validateFields().then(async (values) => {
      if (isNaN(parseInt(values.amount)) || !/^\d+$/.test(values.amount)) {
        notification.error({
          message: "Error",
          description: "Please enter whole number as amount",
        });

        return;
      }

      try {
        if (initialValues?._id) {
          await EditBudget(initialValues._id, {
            category: values.category,
            description: values.description,
            amount: parseInt(values.amount),
          });
        } else {
          await CreateBudget({
            category: values.category,
            description: values.description,
            amount: parseInt(values.amount),
            month: month,
            year: year,
          });
        }
        setReload((current) => !current);
        hanldeModalClose();
      } catch (err: any) {
        if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
          notification.error({
            message: "Error",
            description: err?.response?.data?.userMessage,
          });
        } else {
          notification.error({
            message: "Error",
            description: `Failed to ${values?._id ? "create" : "edit"} budget`,
          });
        }
      }
    });
  };

  const hanldeModalClose = () => {
    form.resetFields();
    onCancel();
  };
  const { Option } = Select;

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleSubmitClick}
      onCancel={hanldeModalClose}
    >
      <Form form={form} layout="vertical" initialValues={initialValues ?? {}}>
        <div className="budget-input-row">
          <Form.Item
            label="Category Name"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
            className="form-item-select"
          >
            <Select placeholder="Select a category" className="select-field">
              {categories.map((item) => (
                <Option key={item._id} value={item.name}>
                  {item.name}
                </Option>
              ))}
              {initialValues?._id && (
                <Option
                  key={initialValues.category}
                  value={initialValues.category}
                >
                  {initialValues.category}
                </Option>
              )}
            </Select>
          </Form.Item>
        </div>
        <div className="budget-input-row">
          <FloatingLableInput
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
            label="Description"
          />
        </div>
        <div className="budget-input-row">
          <FloatingLableInput
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
            label="Amount"
          />
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditBudgetModal;
