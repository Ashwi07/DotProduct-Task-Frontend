import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./index.css";
import plusIcon from "./../../assets/add.svg";
import deleteIcon from "./../../assets/delete.svg";
import editIcon from "./../../assets/edit.svg";
import { notification } from "antd";
import { useEffect, useState } from "react";
import type {
  IMasterExpenseItem,
  IMasterIncomeItem,
  IMasterSavingsItem,
} from "../../dtos/masterData";
import { GetAllMasterData } from "../../apis/masterData";
import AddEditSingeInputModal from "../../components/masterData/AddEditSingleInputModal";
import {
  CreateMasterExpenseType,
  DeleteMasterExpenseType,
  EditMasterExpenseType,
} from "../../apis/masterData/expenseType";
import DeleteModal from "../../components/masterData/DeleteModal";
import {
  CreateMasterSavingsType,
  DeleteMasterSavingsType,
  EditMasterSavingsType,
} from "../../apis/masterData/savingsType";
import {
  CreateMasterIncomeType,
  DeleteMasterIncomeType,
  EditMasterIncomeType,
} from "../../apis/masterData/incomeType";

const GlobalSettingsPage = () => {
  const [expenseData, setExpenseData] = useState<IMasterExpenseItem[]>([]);
  const [incomeData, setIncomeData] = useState<IMasterIncomeItem[]>([]);
  const [savingsData, setSavingsData] = useState<IMasterSavingsItem[]>([]);
  const [reload, setReload] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [openExpenseModal, setOpenExpenseModal] = useState("");
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false);
  const [openIncomeModal, setOpenIncomeModal] = useState("");
  const [openDeleteIncomeModal, setOpenDeleteIncomeModal] = useState(false);
  const [openSavingsModal, setOpenSavingsModal] = useState("");
  const [openDeleteSavingsModal, setOpenDeleteSavingsModal] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await GetAllMasterData(); // get all expense data at once
        setExpenseData(response.data.data.expenseTypes);
        setIncomeData(response.data.data.incomeTypes);
        setSavingsData(response.data.data.savingsTypes);
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
  }, [reload]); // refresh as needed

  // Expense funtions start
  const handleCancelExpenseModal = () => {
    setName("");
    setSelectedItem("");
    setOpenExpenseModal("");
  };

  const handleExpenseOk = async () => {
    try {
      if (name === "") {
        notification.error({
          message: "Error",
          description: `Name Cannot be empty`,
        });
        return;
      }

      if (openExpenseModal === "Add") {
        await CreateMasterExpenseType(name);
      } else {
        await EditMasterExpenseType(selectedItem, name);
      }

      setReload((current) => !current);
      handleCancelExpenseModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Failed to ${openExpenseModal} Expense data`,
        });
      }
    }
  };

  const handleEditExpenseClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenExpenseModal("Edit");
  };

  const handleCancelDeleteExpenseModal = () => {
    setName("");
    setSelectedItem("");
    setOpenDeleteExpenseModal(false);
  };

  const handlleDeleteExpenseClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenDeleteExpenseModal(true);
  };

  const handleDeleteExpenseOk = async () => {
    try {
      await DeleteMasterExpenseType(selectedItem);
      setReload((current) => !current);
      handleCancelDeleteExpenseModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Failed to Delete Expense data`,
        });
      }
    }
  };

  // Income funtions start
  const handleCancelIncomeModal = () => {
    setName("");
    setSelectedItem("");
    setOpenIncomeModal("");
  };

  const handleIncomeOk = async () => {
    try {
      if (name === "") {
        notification.error({
          message: "Error",
          description: `Name Cannot be empty`,
        });
        return;
      }

      if (openIncomeModal === "Add") {
        await CreateMasterIncomeType(name);
      } else {
        await EditMasterIncomeType(selectedItem, name);
      }

      setReload((current) => !current);
      handleCancelIncomeModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Failed to ${openIncomeModal} Income data`,
        });
      }
    }
  };

  const handleEditIncomeClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenIncomeModal("Edit");
  };

  const handleCancelDeleteIncomeModal = () => {
    setName("");
    setSelectedItem("");
    setOpenDeleteIncomeModal(false);
  };

  const handlleDeleteIncomeClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenDeleteIncomeModal(true);
  };

  const handleDeleteIncomeOk = async () => {
    try {
      await DeleteMasterIncomeType(selectedItem);
      setReload((current) => !current);
      handleCancelDeleteIncomeModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Failed to Delete Income data`,
        });
      }
    }
  };

  // Savings funtions start
  const handleCancelSavingsModal = () => {
    setName("");
    setSelectedItem("");
    setOpenSavingsModal("");
  };

  const handleSavingsOk = async () => {
    try {
      if (name === "") {
        notification.error({
          message: "Error",
          description: `Name Cannot be empty`,
        });
        return;
      }

      if (openSavingsModal === "Add") {
        await CreateMasterSavingsType(name);
      } else {
        await EditMasterSavingsType(selectedItem, name);
      }

      setReload((current) => !current);
      handleCancelSavingsModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Failed to ${openSavingsModal} Savings data`,
        });
      }
    }
  };

  const handleEditSavingsClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenSavingsModal("Edit");
  };

  const handleCancelDeleteSavingsModal = () => {
    setName("");
    setSelectedItem("");
    setOpenDeleteSavingsModal(false);
  };

  const handlleDeleteSavingsClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenDeleteSavingsModal(true);
  };

  const handleDeleteSavingsOk = async () => {
    try {
      await DeleteMasterSavingsType(selectedItem);
      setReload((current) => !current);
      handleCancelDeleteSavingsModal();
    } catch (err: any) {
      if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
        notification.error({
          message: "Error",
          description: err?.response?.data?.userMessage,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Failed to Delete Savings data`,
        });
      }
    }
  };

  return (
    <div className="page-container">
      {/* Heading */}
      <div className="header-container">
        <h1 className="page_hd">Global Settings</h1>
      </div>

      {/* Container */}
      <Card
        sx={{
          padding: 0,
          backgroundColor: "#FAFAFA",
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          {/* Master data column divition */}
          <Grid container spacing={1}>
            {/* master data column */}
            <Grid size={4} className="category-container">
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
                {/* Category header */}
                <Grid size={12} sx={{ pl: 0, display: "block" }}>
                  <div
                    className="mainhd d-flex"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      className="category-text"
                      gutterBottom
                    >
                      Expense/Budget
                    </Typography>
                    <IconButton
                      className="icon-btn"
                      onClick={() => setOpenExpenseModal("Add")}
                    >
                      <img src={plusIcon} />
                    </IconButton>
                  </div>
                </Grid>

                {/* Category Data */}
                <div className="v-scroll">
                  {expenseData.map((item) => (
                    <Stack
                      key={item._id}
                      sx={{ mt: 1 }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Card className="category-item">
                        <div className="item-text">{item.name}</div>
                      </Card>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handleEditExpenseClick(item._id, item.name)
                        }
                      >
                        <img src={editIcon} />
                      </IconButton>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handlleDeleteExpenseClick(item._id, item.name)
                        }
                      >
                        <img src={deleteIcon} />
                      </IconButton>
                    </Stack>
                  ))}
                </div>
              </Grid>
            </Grid>
            {/* master data column */}
            <Grid size={4} className="category-container">
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
                {/* Category header */}
                <Grid size={12} sx={{ pl: 0, display: "block" }}>
                  <div
                    className="mainhd d-flex"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      className="category-text"
                      gutterBottom
                    >
                      Income
                    </Typography>
                    <IconButton
                      className="icon-btn"
                      onClick={() => setOpenIncomeModal("Add")}
                    >
                      <img src={plusIcon} />
                    </IconButton>
                  </div>
                </Grid>

                {/* Category data */}
                <div className="v-scroll">
                  {incomeData?.map((item) => (
                    <Stack
                      key={item._id}
                      sx={{ mt: 1 }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Card className="category-item">
                        <div className="item-text">{item.name}</div>
                      </Card>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handleEditIncomeClick(item._id, item.name)
                        }
                      >
                        <img src={editIcon} />
                      </IconButton>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handlleDeleteIncomeClick(item._id, item.name)
                        }
                      >
                        <img src={deleteIcon} />
                      </IconButton>
                    </Stack>
                  ))}
                </div>
              </Grid>
            </Grid>
            {/* master data column */}
            <Grid size={4} className="category-container">
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
                {/* Category header */}
                <Grid size={12} sx={{ pl: 0, display: "block" }}>
                  <div
                    className="mainhd d-flex"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      className="category-text"
                      gutterBottom
                    >
                      Savings
                    </Typography>
                    <IconButton
                      className="icon-btn"
                      onClick={() => setOpenSavingsModal("Add")}
                    >
                      <img src={plusIcon} />
                    </IconButton>
                  </div>
                </Grid>

                {/* Category Data */}
                <div className="v-scroll">
                  {savingsData?.map((item) => (
                    <Stack
                      key={item._id}
                      sx={{ mt: 1 }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Card className="category-item">
                        <div className="item-text">{item.name}</div>
                      </Card>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handleEditSavingsClick(item._id, item.name)
                        }
                      >
                        <img src={editIcon} />
                      </IconButton>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handlleDeleteSavingsClick(item._id, item.name)
                        }
                      >
                        <img src={deleteIcon} />
                      </IconButton>
                    </Stack>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Expense Modals */}
      <AddEditSingeInputModal
        title={
          openExpenseModal === "Add"
            ? "Add Expense Category"
            : "Edit Expense Category"
        }
        label="Expense Name"
        open={Boolean(openExpenseModal)}
        value={name}
        setValue={setName}
        onCancel={handleCancelExpenseModal}
        onOk={handleExpenseOk}
      />
      <DeleteModal
        title="Delete Expense Category"
        open={openDeleteExpenseModal}
        description={`Are you sure you want to delete "${name}"?`}
        onOk={handleDeleteExpenseOk}
        onCancel={handleCancelDeleteExpenseModal}
      />

      {/* Income Modals */}
      <AddEditSingeInputModal
        title={
          openIncomeModal === "Add"
            ? "Add Income Category"
            : "Edit Income Category"
        }
        label="Income Name"
        open={Boolean(openIncomeModal)}
        value={name}
        setValue={setName}
        onCancel={handleCancelIncomeModal}
        onOk={handleIncomeOk}
      />
      <DeleteModal
        title="Delete Income Category"
        open={openDeleteIncomeModal}
        description={`Are you sure you want to delete "${name}"?`}
        onOk={handleDeleteIncomeOk}
        onCancel={handleCancelDeleteIncomeModal}
      />

      {/* Savings Modals */}
      <AddEditSingeInputModal
        title={
          openSavingsModal === "Add"
            ? "Add Savings Category"
            : "Edit Savings Category"
        }
        label="Savings Name"
        open={Boolean(openSavingsModal)}
        value={name}
        setValue={setName}
        onCancel={handleCancelSavingsModal}
        onOk={handleSavingsOk}
      />
      <DeleteModal
        title="Delete Savings Category"
        open={openDeleteSavingsModal}
        description={`Are you sure you want to delete "${name}"?`}
        onOk={handleDeleteSavingsOk}
        onCancel={handleCancelDeleteSavingsModal}
      />
    </div>
  );
};

export default GlobalSettingsPage;
