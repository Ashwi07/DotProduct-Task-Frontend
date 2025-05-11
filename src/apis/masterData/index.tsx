import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Get all master data
export const GetAllMasterData = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${config.apiUrl}/api/common/get-all-master`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get all sub categories configured
export const GetSubTypes = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${config.apiUrl}/api/common/get-sub-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
