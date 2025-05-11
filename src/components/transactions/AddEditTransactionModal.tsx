import { DatePicker, Form, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import FloatingLableInput from "../login/FloatingLableInput";
import "./AddEditTransactionModal.css";
import type {
  IMasterExpenseItem,
  IMasterIncomeItem,
  IMasterSavingsItem,
} from "../../dtos/masterData";
import type { ICategoryType, ITransactionItem } from "../../dtos/transactions";
import moment from "moment";
import { CreateTransaction, EditTransaction } from "../../apis/transactions";
import { GetSubTypes } from "../../apis/masterData";

interface AddEditTransactionModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
  initialValues?: ITransactionItem | null;
}

const AddEditTransactionModal: React.FC<AddEditTransactionModalProps> = ({
  title,
  open,
  onCancel,
  setReload,
  reload,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<{
    Expense: IMasterExpenseItem[];
    Income: IMasterIncomeItem[];
    Savings: IMasterSavingsItem[];
  }>({ Expense: [], Income: [], Savings: [] });

  useEffect(() => {
    (async () => {
      try {
        const response = await GetSubTypes(); // Get all sub categories mappped to their categories
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
            description: "Failed to fetch data",
          });
        }
      }
    })();
  }, [reload]); // refresh page as needed

  // set initial values if edit option is clicked
  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        initialValues?._id
          ? {
              ...initialValues,
              transactionDate: moment(initialValues.transactionDate),
            }
          : {
              name: "",
              description: "",
              category: undefined,
              subType: undefined,
              amount: "",
              transactionDate: moment(),
            }
      );
    }
  }, [open, initialValues, form]);

  const handleSubmitClick = () => {
    // validate current values
    form.validateFields().then(async (values) => {
      // check if amount is a number
      if (isNaN(parseInt(values.amount)) || !/^\d+$/.test(values.amount)) {
        notification.error({
          message: "Error",
          description: "Please enter whole number as amount",
        });

        return;
      }

      // if edit option was selected then call edit api otherwise call add api
      try {
        if (initialValues?._id) {
          await EditTransaction(initialValues._id, {
            name: values.name,
            description: values.description,
            category: values.category,
            subType: values.subType,
            amount: parseInt(values.amount),
            transactionDate: values.transactionDate.format("YYYY-MM-DD"),
          });
        } else {
          await CreateTransaction({
            name: values.name,
            description: values.description,
            category: values.category,
            subType: values.subType,
            amount: parseInt(values.amount),
            transactionDate: values.transactionDate.format("YYYY-MM-DD"),
          });
        }

        // refresh data and close modal
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
            description: `Failed to ${
              values?._id ? "edit" : "create"
            } transaction`,
          });
        }
      }
    });
  };

  // reset fields when modal is closed
  const hanldeModalClose = () => {
    form.resetFields();
    onCancel();
  };
  const { Option } = Select;
  const categoryValue = Form.useWatch("category", form);

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleSubmitClick}
      onCancel={hanldeModalClose}
    >
      <Form form={form} layout="vertical">
        {/* Name input */}
        <div className="transaction-input-row">
          <FloatingLableInput
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
            label="Name"
          />
        </div>

        {/* Description(optional) input */}
        <div className="transaction-input-row">
          <FloatingLableInput name="description" label="Description" />
        </div>

        {/* Category input - fixed list */}
        <div className="transaction-input-row">
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
            className="form-item-select"
          >
            <Select
              placeholder="Select a category"
              className="select-field"
              onChange={() => form.setFieldValue("subType", undefined)} // reset sub category if category is changed
            >
              <Option key={"1"} value="Income">
                Income
              </Option>
              <Option key={"2"} value="Expense">
                Expense
              </Option>
              <Option key={"3"} value="Savings">
                Savings
              </Option>
            </Select>
          </Form.Item>
        </div>

        {/* Sub category input */}
        <div className="transaction-input-row">
          <Form.Item
            name="subType"
            rules={[
              { required: true, message: "Please select a sub category" },
            ]}
            className="form-item-select"
          >
            <Select
              placeholder="Select a sub category"
              className="select-field"
              disabled={!categoryValue} // disabled if no category is selected
            >
              {(["Income", "Expense", "Savings"].includes(
                categoryValue
              ) /* dynamic mapping as per the selected category */
                ? categories[categoryValue as ICategoryType]
                : []
              ).map((item) => (
                <Option key={item._id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Amount input */}
        <div className="transaction-input-row">
          <FloatingLableInput
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
            label="Amount"
          />
        </div>

        {/* Transaction date input */}
        <div className="transaction-input-row">
          <Form.Item
            name="transactionDate"
            rules={[
              { required: true, message: "Transaction Date is required" },
            ]}
          >
            <DatePicker
              style={{ width: "100%", height: "45px" }}
              format={"YYYY-MM-DD"} // api date format
              placeholder="Select Date"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransactionModal;
