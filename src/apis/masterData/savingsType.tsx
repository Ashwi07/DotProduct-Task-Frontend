import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Add Savings sub category
export const CreateMasterSavingsType = async (name: string) => {
  const token = Cookies.get("token");
  return await axios.post(
    `${config.apiUrl}/api/master-savings-type`,
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

// Edit Savings sub category
export const EditMasterSavingsType = async (id: string, name: string) => {
  const token = Cookies.get("token");
  return await axios.put(
    `${config.apiUrl}/api/master-savings-type/${id}`,
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

// Delete Savings sub category
export const DeleteMasterSavingsType = async (id: string) => {
  const token = Cookies.get("token");
  return await axios.delete(`${config.apiUrl}/api/master-savings-type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
