import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Add Income sub category
export const CreateMasterIncomeType = async (name: string) => {
  const token = Cookies.get("token");
  return await axios.post(
    `${config.apiUrl}/api/master-income-type`,
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

// Edit Income sub category
export const EditMasterIncomeType = async (id: string, name: string) => {
  const token = Cookies.get("token");
  return await axios.put(
    `${config.apiUrl}/api/master-income-type/${id}`,
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

// Delete Income sub category
export const DeleteMasterIncomeType = async (id: string) => {
  const token = Cookies.get("token");
  return await axios.delete(`${config.apiUrl}/api/master-income-type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
