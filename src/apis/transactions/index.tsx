import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

export const GetTransactionData = async (
  month: number,
  year: number,
  sort: string,
  page: number,
  searchTerm: string,
  filterQuery: string
) => {
  const token = Cookies.get("token");
  return await axios.get(
    `${
      config.apiUrl
    }/api/transaction/${month}/${year}?page=${page}&limit=${10}&sort=${sort}&searchTerm=${searchTerm}&filter=${filterQuery}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const CreateTransaction = async (payload: {
  name: string;
  description?: string;
  category: string;
  subType: string;
  amount: number;
  transactionDate: string;
}) => {
  const token = Cookies.get("token");
  return await axios.post(`${config.apiUrl}/api/transaction`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const EditTransaction = async (
  id: string,
  payload: {
    name?: string;
    description?: string;
    category?: string;
    subType?: string;
    amount?: number;
    transactionDate?: string;
  }
) => {
  const token = Cookies.get("token");
  return await axios.put(`${config.apiUrl}/api/transaction/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteTransaction = async (id: string) => {
  const token = Cookies.get("token");
  return await axios.delete(`${config.apiUrl}/api/transaction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
