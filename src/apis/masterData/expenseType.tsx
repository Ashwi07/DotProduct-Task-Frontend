import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Add Expense sub category
export const CreateMasterExpenseType = async (name: string) => {
  const token = Cookies.get("token");
  return await axios.post(
    `${config.apiUrl}/api/master-expense-type`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Edit Expense sub category
export const EditMasterExpenseType = async (id: string, name: string) => {
  const token = Cookies.get("token");
  return await axios.put(
    `${config.apiUrl}/api/master-expense-type/${id}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Delete Expense sub category
export const DeleteMasterExpenseType = async (id: string) => {
  const token = Cookies.get("token");
  return await axios.delete(`${config.apiUrl}/api/master-expense-type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
