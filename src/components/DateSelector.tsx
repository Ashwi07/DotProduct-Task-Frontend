import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./DateSelector.css";

interface DateSelectorProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  /* Previous month */
  const decrementMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
    );
  };

  /* Next month */
  const incrementMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
    );
  };

  /* Date selector label */
  const monthYearLabel = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="date-selector">
      {/* Previous month button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={decrementMonth}
        size="small"
      />
      {/* Date selector label */}
      <div className="date-label">{monthYearLabel}</div>
      {/* Next month button */}
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={incrementMonth}
        size="small"
      />
    </div>
  );
};

export default DateSelector;
