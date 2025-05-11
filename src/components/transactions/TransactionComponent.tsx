import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  notification,
  Table,
  type MenuProps,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./TransactionComponent.css";
import DeleteModal from "../masterData/DeleteModal";
import { DeleteTransaction, GetTransactionData } from "../../apis/transactions";
import type { ITransactionItem } from "../../dtos/transactions";
import AddEditTransactionModal from "./AddEditTransactionModal";
import moment from "moment";
import { GetSubTypes } from "../../apis/masterData";

interface ITransactionsParams {
  month: number;
  year: number;
}

const Transactions: React.FC<ITransactionsParams> = ({ month, year }) => {
  const [reload, setReload] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState("");
  const [data, setData] = useState<ITransactionItem[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ITransactionItem | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sort, setSort] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSize, setTotalSize] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [subTypeFilterList, setSubTypeFilterList] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [subTypeFilters, setSubTypeFilters] = useState([]);
  const prevFiltersRef = useRef<any>({});
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await GetTransactionData(
          month,
          year,
          sort,
          currentPage,
          searchTerm,
          filterQuery
        ); // get specfied month's data as per the filters applied
        setData(response.data.data);
        setTotalSize(response.data.total);
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
  }, [reload, sort, currentPage, searchTerm, filterQuery, month, year]); // refresh values as the parameters change

  useEffect(() => {
    (async () => {
      try {
        const response = await GetSubTypes();
        let subTypeSet = new Set<string>();
        Object.keys(response.data.data).map((item) => {
          response.data.data[item].map((element: { name: string }) =>
            subTypeSet.add(element.name)
          );
        }); /* get all unique sub categories regardless of their parent category into a single array */
        setSubTypeFilterList(Array.from(subTypeSet));
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
  }, []);

  // wait 500ms before calling the actual api
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleEditClick = (record: ITransactionItem) => {
    setSelectedRecord(record);
    setOpenTransactionModal("Edit");
  };

  const handleDeleteClick = (record: ITransactionItem) => {
    setSelectedRecord(record);
    setOpenDeleteModal(true);
  };

  // handle sort and filter changes
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter?.order) {
      setSort(`{"${sorter.field}": "${sorter.order}"}`);
    } else {
      setSort("");
    }

    // if filters have changed then set page to 1 otherwise keep current page
    const prevFilters = prevFiltersRef.current;
    const currentFilters = filters;

    const filtersChanged =
      JSON.stringify(prevFilters) !== JSON.stringify(currentFilters);

    if (filtersChanged) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pagination.current);
    }

    // apply current filters
    setCategoryFilters(filters.category);
    setSubTypeFilters(filters.subType);
    setFilterQuery(
      JSON.stringify({ category: filters.category, subType: filters.subType })
    );
    prevFiltersRef.current = currentFilters;
  };

  const handleTransactionModalClose = () => {
    setOpenTransactionModal("");
    setSelectedRecord(null);
  };

  const handleDeleteTransaction = async () => {
    try {
      await DeleteTransaction(selectedRecord?._id || "");
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
          description: "Failed to delete transaction",
        });
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setSelectedRecord(null);
    setOpenDeleteModal(false);
  };

  // table configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left" as const,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipses: true,
      responsie: ["md"], // responsive description column
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Savings", value: "Savings" },
        { text: "Income", value: "Income" },
        { text: "Expense", value: "Expense" },
      ], // filter values
      filteredValue: categoryFilters,
      onFilter: () => true, // enable filter option
    },
    {
      title: "Sub Category",
      dataIndex: "subType",
      key: "subType",
      filters: subTypeFilterList.map((item) => ({ text: item, value: item })), // custom filter values
      filteredValue: subTypeFilters,
      onFilter: () => true, // enable filter option
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: true, // enable sorting
      render: (value: Date) => moment(value).format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      sorter: true, // enable sorting
    },
    {
      title: "",
      key: "actions",
      width: 50,
      align: "center" as const,
      render: (_: any, record: ITransactionItem) => {
        // dropdown option for edit and delete
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
            {" "}
            {/* Dropdown menu button */}
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
    <div className="transaction-container">
      {/* Seach box */}
      <div className="transaction-header">
        <Input.Search
          placeholder="Search Transactions"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          allowClear
          className="transaction-search-input"
        />

        {/* Add transaction */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenTransactionModal("Add")}
        >
          Add Transaction
        </Button>
      </div>

      {/* transaction table */}
      <Table
        columns={columns}
        dataSource={data}
        bordered
        rowClassName="transaction-row"
        className="transaction-table"
        scroll={{ x: true }}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: totalSize,
          showSizeChanger: false,
          onChange: (page) => setCurrentPage(page),
          responsive: true,
          position: ["bottomRight"],
        }}
        onChange={handleTableChange}
        rowKey="_id"
      />

      {/* Add/Edit transaction modal */}
      <AddEditTransactionModal
        open={Boolean(openTransactionModal)}
        title={
          openTransactionModal === "Add"
            ? "Add Transaction"
            : "Edit Transaction"
        }
        onCancel={handleTransactionModalClose}
        setReload={setReload}
        reload={reload}
        initialValues={selectedRecord}
      />

      {/* Delete transaction modal */}
      <DeleteModal
        title="Delete Transaction"
        description={`Are you sure you want to delete transaction "${selectedRecord?.name}"?`}
        open={openDeleteModal}
        onCancel={handleCloseDeleteModal}
        onOk={handleDeleteTransaction}
      />
    </div>
  );
};

export default Transactions;
