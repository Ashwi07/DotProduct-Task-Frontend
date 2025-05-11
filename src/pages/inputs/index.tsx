import { Card } from "antd";
import "./index.css";
import { useState } from "react";
import DateSelector from "../../components/DateSelector";
import BudgetComponent from "../../components/Inputs/Budget";

const InputsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="page-container">
      <div className="header-container">
        <h1 className="page_hd">Budget Overview</h1>
      </div>
      <Card className="inner-container">
        {/* Month selector */}
        <DateSelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        {/* Budget component */}
        <BudgetComponent
          month={currentDate.getMonth()}
          year={currentDate.getFullYear()}
        />
      </Card>
    </div>
  );
};

export default InputsPage;
