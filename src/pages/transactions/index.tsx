import { Card } from "antd";
import "./index.css";
import { useState } from "react";
import DateSelector from "../../components/DateSelector";
import TransactionsComponent from "../../components/transactions/TransactionComponent";

const TransactionsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="page-container">
      <div className="header-container">
        <h1 className="page_hd">Transaction Overview</h1>
      </div>
      <Card className="inner-container">
        <DateSelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <TransactionsComponent
          month={currentDate.getMonth()}
          year={currentDate.getFullYear()}
        />
      </Card>
    </div>
  );
};

export default TransactionsPage;
