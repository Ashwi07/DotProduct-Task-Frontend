import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

// Get Budget list
export const GetBudgetData = async (
  month: number,
  year: number,
  sort: string | undefined
) => {
  const token = Cookies.get("token");
  return await axios.get(
    `${config.apiUrl}/api/budget/${month}/${year}?sort=${
      sort ? `{"amount": "${sort}"}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get Categories that are not already used in the budget
export const GetBudgetCategoriesData = async (month: number, year: number) => {
  const token = Cookies.get("token");
  return await axios.get(
    `${config.apiUrl}/api/budget/unused-budget-categories/${month}/${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Add a budget item
export const CreateBudget = async (payload: {
  category: string;
  description?: string;
  amount: number;
  month: number;
  year: number;
}) => {
  const token = Cookies.get("token");
  return await axios.post(`${config.apiUrl}/api/budget`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Edit a budget item
export const EditBudget = async (
  id: string,
  payload: {
    category?: string;
    description?: string;
    amount?: number;
  }
) => {
  const token = Cookies.get("token");
  return await axios.put(`${config.apiUrl}/api/budget/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete a budget itemi
export const DeleteBudget = async (id: string) => {
  const token = Cookies.get("token");
  return await axios.delete(`${config.apiUrl}/api/budget/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
