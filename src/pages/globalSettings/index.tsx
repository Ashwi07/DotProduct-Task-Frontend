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
  IMasterRewardItem,
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
  CreateMasterReward,
  DeleteMasterReward,
  EditMasterReward,
} from "../../apis/masterData/reward";
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
import AddEditRewardModal from "../../components/masterData/AddEditRewardModal";

const GlobalSettingsPage = () => {
  const [expenseData, setExpenseData] = useState<IMasterExpenseItem[]>([]);
  const [incomeData, setIncomeData] = useState<IMasterIncomeItem[]>([]);
  const [savingsData, setSavingsData] = useState<IMasterSavingsItem[]>([]);
  const [rewardData, setRewardData] = useState<IMasterRewardItem[]>([]);
  const [reload, setReload] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [openExpenseModal, setOpenExpenseModal] = useState("");
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false);
  const [openIncomeModal, setOpenIncomeModal] = useState("");
  const [openDeleteIncomeModal, setOpenDeleteIncomeModal] = useState(false);
  const [openSavingsModal, setOpenSavingsModal] = useState("");
  const [openDeleteSavingsModal, setOpenDeleteSavingsModal] = useState(false);
  const [openRewardModal, setOpenRewardModal] = useState("");
  const [openDeleteRewardModal, setOpenDeleteRewardModal] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const response = await GetAllMasterData();
        setExpenseData(response.data.data.expenseTypes);
        setIncomeData(response.data.data.incomeTypes);
        setSavingsData(response.data.data.savingsTypes);
        setRewardData(response.data.data.rewards);
      })();
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Failed to fetch data",
      });
    }
  }, [reload]);

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
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to ${openExpenseModal} Expense data`,
      });
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
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to Delete Expense data`,
      });
    }
  };

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
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to ${openIncomeModal} Income data`,
      });
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
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to Delete Income data`,
      });
    }
  };

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
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to ${openSavingsModal} Savings data`,
      });
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
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to Delete Savings data`,
      });
    }
  };

  const handleCancelRewardModal = () => {
    setName("");
    setSelectedItem("");
    setSelectedAmount(0);
    setOpenRewardModal("");
  };

  const handleRewardOk = async () => {
    try {
      if (name === "") {
        notification.error({
          message: "Error",
          description: `Name Cannot be empty`,
        });
        return;
      }

      if (selectedAmount <= 0) {
        notification.error({
          message: "Error",
          description: `Amount should be greater than 0`,
        });
        return;
      }

      if (openRewardModal === "Add") {
        await CreateMasterReward(name, selectedAmount);
      } else {
        await EditMasterReward(selectedItem, name, selectedAmount);
      }

      setReload((current) => !current);
      handleCancelRewardModal();
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to ${openRewardModal} Reward data`,
      });
    }
  };

  const handleEditRewardClick = (id: string, value: string, amount: number) => {
    setSelectedItem(id);
    setName(value);
    setSelectedAmount(amount);
    setOpenRewardModal("Edit");
  };

  const handleCancelDeleteRewardModal = () => {
    setName("");
    setSelectedItem("");
    setOpenDeleteRewardModal(false);
  };

  const handlleDeleteRewardClick = (id: string, value: string) => {
    setSelectedItem(id);
    setName(value);
    setOpenDeleteRewardModal(true);
  };

  const handleDeleteRewardOk = async () => {
    try {
      await DeleteMasterReward(selectedItem);
      setReload((current) => !current);
      handleCancelDeleteRewardModal();
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Failed to Delete Reward data`,
      });
    }
  };

  return (
    <div className="page-container">
      <div className="header-container">
        <h1 className="page_hd">Global Settings</h1>
      </div>
      <Card
        sx={{
          padding: 0,
          backgroundColor: "#FAFAFA",
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          <Grid container spacing={1}>
            <Grid size={3} className="category-container">
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
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
            <Grid size={3} className="category-container">
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
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
            <Grid size={3} className="category-container">
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
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
            <Grid size={3}>
              <Grid
                className="v-align"
                sx={{ maxWidth: "100%", pl: 3, mt: 1, mr: 3 }}
                container
                spacing={2}
              >
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
                      Reward
                    </Typography>
                    <IconButton
                      className="icon-btn"
                      onClick={() => setOpenRewardModal("Add")}
                    >
                      <img src={plusIcon} />
                    </IconButton>
                  </div>
                </Grid>
                <div className="v-scroll">
                  {rewardData?.map((item) => (
                    <Stack
                      key={item._id}
                      sx={{ mt: 1 }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Card className="category-item">
                        <div className="item-text">
                          {item.name} - {item.amount}
                        </div>
                      </Card>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handleEditRewardClick(
                            item._id,
                            item.name,
                            item.amount
                          )
                        }
                      >
                        <img src={editIcon} />
                      </IconButton>
                      <IconButton
                        className="icon-btn"
                        onClick={() =>
                          handlleDeleteRewardClick(item._id, item.name)
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
      <AddEditSingeInputModal
        title={
          openSavingsModal === "Add"
            ? "Add Expense Category"
            : "Edit Expense Category"
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
      <AddEditRewardModal
        title={
          openRewardModal === "Add"
            ? "Add Reward Category"
            : "Edit Reward Category"
        }
        open={Boolean(openRewardModal)}
        value={name}
        setValue={setName}
        amount={selectedAmount}
        setAmount={setSelectedAmount}
        onCancel={handleCancelRewardModal}
        onOk={handleRewardOk}
      />
      <DeleteModal
        title="Delete Reward"
        open={openDeleteRewardModal}
        description={`Are you sure you want to delete "${name}"?`}
        onOk={handleDeleteRewardOk}
        onCancel={handleCancelDeleteRewardModal}
      />
    </div>
  );
};

export default GlobalSettingsPage;
