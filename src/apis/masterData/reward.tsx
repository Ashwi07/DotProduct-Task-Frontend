import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Add Reward
export const CreateMasterReward = async (name: string, amount: number) => {
  const token = Cookies.get("token");
  return await axios.post(
    `${config.apiUrl}/api/master-reward`,
    {
      name,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Edit Reward
export const EditMasterReward = async (
  id: string,
  name: string,
  amount: number
) => {
  const token = Cookies.get("token");
  return await axios.put(
    `${config.apiUrl}/api/master-reward/${id}`,
    {
      name,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Delete Reward
export const DeleteMasterReward = async (id: string) => {
  const token = Cookies.get("token");
  return await axios.delete(`${config.apiUrl}/api/master-reward/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
