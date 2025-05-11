import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

export const GetAllMasterData = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${config.apiUrl}/api/common/get-all-master`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetSubTypes = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${config.apiUrl}/api/common/get-sub-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
