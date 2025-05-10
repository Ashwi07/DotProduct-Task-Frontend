import { useEffect, useState } from "react";
import type { IBudgetItem } from "../../dtos/inputs";
import { Button, Dropdown, notification, Table, type MenuProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./Budget.css";
import { DeleteBudget, GetBudgetData } from "../../apis/inputs/budget";
import AddEditBudgetModal from "./AddEditBudgetModal";
import DeleteModal from "../masterData/DeleteModal";

interface IBudgetParams {
  month: number;
  year: number;
}

const Budget: React.FC<IBudgetParams> = ({ month, year }) => {
  const [reload, setReload] = useState(false);
  const [openBudgetModal, setOpenBudgetModal] = useState("");
  const [data, setData] = useState<IBudgetItem[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<IBudgetItem | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sort, setSort] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response = await GetBudgetData(month, year, sort);
        setData(response.data.data);
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
  }, [reload, sort, month, year]);

  const handleEditClick = (record: IBudgetItem) => {
    setSelectedRecord(record);
    setOpenBudgetModal("Edit");
  };

  const handleDeleteClick = (record: IBudgetItem) => {
    setSelectedRecord(record);
    setOpenDeleteModal(true);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setSort(sorter.order);
  };

  const handleBudgetModalClose = () => {
    setOpenBudgetModal("");
    setSelectedRecord(null);
  };

  const handleDeleteBudget = async () => {
    try {
      await DeleteBudget(selectedRecord?._id || "");
      setReload((current) => !current);
      handleCloseDeleteModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to delete budget",
        });
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setSelectedRecord(null);
    setOpenDeleteModal(false);
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      sorter: true,
    },
    {
      title: "",
      key: "actions",
      width: 50,
      align: "center" as const,
      render: (_: any, record: IBudgetItem) => {
        const actionsMenu: MenuProps["items"] = [
          {
            key: "edit",
            label: "Edit",
            icon: <EditOutlined />,
            onClick: () => handleEditClick(record),
          },
          {
            key: "delete",
            label: "Delete",
            icon: <DeleteOutlined />,
            onClick: () => handleDeleteClick(record),
          },
        ];

        return (
          <Dropdown menu={{ items: actionsMenu }} trigger={["click"]}>
            <Button
              shape="circle"
              icon={<SettingOutlined />}
              size="small"
              className="gear-button"
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="budget-container">
      <div className="budget-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenBudgetModal("Add")}
        >
          Add Budget
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowClassName="budget-row"
        className="budget-table"
        scroll={{ x: true }}
        pagination={false}
        onChange={handleTableChange}
        rowKey="_id"
      />
      <AddEditBudgetModal
        open={Boolean(openBudgetModal)}
        title={openBudgetModal === "Add" ? "Add Budget" : "Edit Budget"}
        month={month}
        year={year}
        onCancel={handleBudgetModalClose}
        setReload={setReload}
        reload={reload}
        initialValues={selectedRecord}
      />
      <DeleteModal
        title="Delete Budget"
        description={`Are you sure you want to delete budget "${selectedRecord?.category}"?`}
        open={openDeleteModal}
        onCancel={handleCloseDeleteModal}
        onOk={handleDeleteBudget}
      />
    </div>
  );
};

export default Budget;
