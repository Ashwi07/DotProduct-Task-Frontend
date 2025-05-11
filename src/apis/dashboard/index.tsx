import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Get Budget list
export const GetDashboardDetails = async (month: number, year: number) => {
  const token = Cookies.get("token");
  return await axios.get(
    `${config.apiUrl}/api/common/get-dashboard-details/${month}/${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
